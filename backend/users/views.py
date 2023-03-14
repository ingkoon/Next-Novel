import os
from allauth.socialaccount.providers.kakao import views as kakao_view
from allauth.socialaccount.models import SocialAccount
from allauth.socialaccount.providers.oauth2.client import OAuth2Client
from dj_rest_auth.registration.views import SocialLoginView
from django.http import JsonResponse
from django.shortcuts import render, redirect
import requests
# Create your views here.
from rest_framework import status
from json import JSONDecodeError

from rest_framework.generics import RetrieveAPIView
from rest_framework.response import Response
from rest_framework.views import APIView

from novels.models import Novel
from users.models import User
from nextnovel.settings import STATE, KAKAO_CLIENT_ID
from users.serializers import UserProfileSerializer

state = STATE
BASE_URL = 'http://localhost:8000/'
KAKAO_CALLBACK_URI = BASE_URL + 'api/user/kakao/callback/'


def kakao_login(request):
    client_id = KAKAO_CLIENT_ID

    return redirect(
        f"https://kauth.kakao.com/oauth/authorize?client_id={client_id}&redirect_uri={KAKAO_CALLBACK_URI}&response_type=code&scope=account_email")


def kakao_callback(request):
    client_id = KAKAO_CLIENT_ID
    code = request.GET.get("code")

    # code로 access token 요청
    token_request = requests.get(
        f"https://kauth.kakao.com/oauth/token?grant_type=authorization_code&client_id={client_id}&redirect_uri={KAKAO_CALLBACK_URI}&code={code}")
    token_response_json = token_request.json()

    # 에러 발생 시 중단
    error = token_response_json.get("error", None)
    # if error is not None:
    #     raise JSONDecodeError(error)

    access_token = token_response_json.get("access_token")

    # access token으로 카카오톡 프로필 요청
    profile_request = requests.post(
        "https://kapi.kakao.com/v2/user/me",
        headers={"Authorization": f"Bearer {access_token}"},
    )
    profile_json = profile_request.json()

    kakao_account = profile_json.get("kakao_account")
    email = kakao_account.get("email", None)  # 이메일!

    # 이메일 없으면 오류 => 카카오톡 최신 버전에서는 이메일 없이 가입 가능해서 추후 수정해야함
    if email is None:
        return JsonResponse({'err_msg': 'failed to get email'}, status=status.HTTP_400_BAD_REQUEST)
    # profile = kakao_account.get("profile")
    # nickname = profile.get("nickname")
    # profile_image = profile.get("thumbnail_image_url")

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
        print(accept_json)
        accept_json.pop('user', None)
        print(accept_json, 'hahaha')
        return JsonResponse(accept_json)
    except User.DoesNotExist:
        # 애초에 가입된 유저가 없으면 =>  새로 회원가입 & 해당유저의 jwt발급
        data = {'access_token': access_token, 'code': code}
        accept = requests.post(f"{BASE_URL}api/user/kakao/login/finish/", data=data)
        accept_status = accept.status_code

        if accept_status != 200:
            return JsonResponse({'err_msg': 'failed to signup'}, status=accept_status)

        accept_json = accept.json()
        accept_json.pop('user', None)
        return JsonResponse(accept_json)
    except SocialAccount.DoesNotExist:
        return JsonResponse({'err_msg': 'email exists but not social user'}, status=status.HTTP_400_BAD_REQUEST)


class KakaoLogin(SocialLoginView):
    adapter_class = kakao_view.KakaoOAuth2Adapter
    callback_url = KAKAO_CALLBACK_URI
    client_class = OAuth2Client


class UserProfileAPI(APIView):
    serializer_class = UserProfileSerializer

    def get(self, request, **kwargs):
        user = request.user
        serializer = UserProfileSerializer(data=user)
        return Response(data=serializer.data, status=status.HTTP_200_OK)


class UserNovelAPI(RetrieveAPIView):
    queryset = Novel.objects.all()
