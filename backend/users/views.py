import os
from time import sleep

from allauth.socialaccount.providers.kakao import views as kakao_view
from allauth.socialaccount.models import SocialAccount
from allauth.socialaccount.providers.oauth2.client import OAuth2Client
from dj_rest_auth.registration.views import SocialLoginView
from django.core.files.base import ContentFile
from django.db.models import QuerySet
from django.http import JsonResponse
from django.shortcuts import render, redirect
import requests
from rest_framework import status

from rest_framework.generics import RetrieveAPIView, RetrieveUpdateAPIView, ListAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken

from nextnovel.utils import create_random_nickname
from novels.models import Novel, NovelContentImage
from novels.serializers import NovelListSerializer, NovelContentImageSerializer, NovelContentImageOnlySerializer
from users.models import User
from nextnovel.settings import STATE, KAKAO_CLIENT_ID
from users.serializers import UserProfileSerializer

state = STATE
BASE_URL = os.environ.get('BASE_URL', "http://localhost:8000/")
KAKAO_CALLBACK_URI = BASE_URL + 'api/user/kakao/callback/'
REDIRECT_URI = os.environ.get("REDIRECT_URI", "http://localhost:3000")


def get_random_nickname():
    while True:
        nickname = create_random_nickname()
        if User.objects.filter(nickname=nickname).exists():
            continue
        break
    return nickname


def kakao_login(request):
    client_id = KAKAO_CLIENT_ID

    return redirect(
        f"https://kauth.kakao.com/oauth/authorize?client_id={client_id}&redirect_uri={KAKAO_CALLBACK_URI}&response_type=code&scope=account_email")


class KakaoCallback(APIView):
    def get(self, request):
        client_id = KAKAO_CLIENT_ID
        code = request.GET.get("code")
        # code로 access token 요청
        token_request = requests.get(
            f"https://kauth.kakao.com/oauth/token?grant_type=authorization_code&client_id={client_id}&redirect_uri={REDIRECT_URI}&code={code}")
        token_response_json = token_request.json()
        access_token = token_response_json.get("access_token")

        # access token으로 카카오톡 프로필 요청
        profile_request = requests.post(
            "https://kapi.kakao.com/v2/user/me",
            headers={"Authorization": f"Bearer {access_token}"},
        )

        profile_json = profile_request.json()

        kakao_account = profile_json.get("kakao_account")

        email = kakao_account.get("email", None)  # 이메일!

        # 이메일 없으면 오류
        if email is None:
            return JsonResponse({'err_msg': 'failed to get email'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            # 유저가 있는지 탐색
            user = User.objects.get(email=email)
            social_user = SocialAccount.objects.get(user=user)

            if social_user.provider != 'kakao':
                return JsonResponse({'err_msg': 'no matching social type'}, status=status.HTTP_400_BAD_REQUEST)

            data = {'access_token': access_token, 'code': code}
            # FIX ME
            accept = requests.post(f"{BASE_URL}api/user/kakao/login/finish/", data=data)
            accept_status = accept.status_code

            if accept_status != 200:
                return JsonResponse({'err_msg': 'failed to signin'}, status=accept_status)
            accept_json = accept.json()
            return Response(accept_json, status=status.HTTP_200_OK)
        except User.DoesNotExist:
            # 애초에 가입된 유저가 없으면 =>  새로 회원가입 & 해당유저의 jwt발급
            data = {'access_token': access_token, 'code': code}
            accept = requests.post(f"{BASE_URL}api/user/kakao/login/finish/", data=data)
            accept_status = accept.status_code
            if accept_status != 200:
                return Response(data={'err_msg': 'failed to signup'}, status=accept_status)

            accept_json = accept.json()

            user_pk = accept_json.get('user').pop('pk')
            created_user = User.objects.get(pk=user_pk)

            # 닉네임 로직
            nickname = get_random_nickname()
            created_user.nickname = nickname
            accept_json['user']['nickname'] = nickname

            # profile image 로직
            profile_image = profile_json.get("properties").get("profile_image")
            response = requests.get(profile_image)
            image_content = ContentFile(response.content)
            file_name = f"temp_profile.png"
            created_user.profile_image.save(file_name, image_content)
            created_user.save()

            return Response(data=accept_json, status=status.HTTP_201_CREATED)


        except SocialAccount.DoesNotExist:
            return JsonResponse({'err_msg': 'email exists but not social user'}, status=status.HTTP_400_BAD_REQUEST)


class KakaoLogin(SocialLoginView):
    adapter_class = kakao_view.KakaoOAuth2Adapter
    callback_url = KAKAO_CALLBACK_URI
    client_class = OAuth2Client


class UserProfileAPI(RetrieveUpdateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = UserProfileSerializer

    def get_object(self):
        return self.request.user


class UserNovelAPI(ListAPIView):
    permission_classes = [IsAuthenticated]
    queryset = Novel.objects.all().filter(status=Novel.Status.FINISHED)
    serializer_class = NovelListSerializer

    def get_queryset(self):
        queryset = self.queryset
        queryset = queryset.filter(author=self.request.user).select_related('author', 'novelstats')
        return queryset


class UserLikedNovelAPI(ListAPIView):
    queryset = Novel.objects.all()
    serializer_class = NovelListSerializer

    def get_queryset(self):
        queryset = self.queryset
        queryset = queryset.filter(novellike__user=self.request.user).select_related('author', 'novelstats')
        return queryset


# To be deleted
class UserTestAuthAPI(APIView):
    def post(self, request):
        user_id = request.data.get('user_id')
        user = User.objects.get(pk=user_id)
        refresh = RefreshToken.for_user(user)

        data = {
            'refresh': str(refresh),
            'access': str(refresh.access_token),
        }
        return Response(data=data)


class MytestAPI(APIView):
    def get(self, request):
        data = {
            "sleep": "for 10sec"
        }
        return Response(data=data, status=200)


class UserDrawingsListAPI(ListAPIView):
    queryset = NovelContentImage.objects.select_related("novel_content__novel__author").only('image',
                                                                                             "novel_content__novel__author")

    serializer_class = NovelContentImageOnlySerializer

    def get_queryset(self):
        queryset = self.queryset.filter(novel_content__novel__author=self.request.user)
        return queryset
