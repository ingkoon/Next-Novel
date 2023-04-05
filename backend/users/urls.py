import os

from django.urls import path

from users.views import kakao_login, KakaoLogin, UserProfileAPI, UserTestAuthAPI, UserNovelAPI, \
    UserLikedNovelAPI, MytestAPI, UserDrawingsListAPI, KakaoCallback

app_name = 'users'

urlpatterns = [
    path('drawing/', UserDrawingsListAPI.as_view(), name='user_drawing'),
    path('novel/', UserNovelAPI.as_view(), name='user_novel'),
    path('liked-novel/', UserLikedNovelAPI.as_view(), name='user_liked_novel'),
    path('', UserProfileAPI.as_view(), name='user_profile'),
    path('kakao/login', kakao_login, name='kakao_login'),
    path('kakao/callback/', KakaoCallback.as_view(), name='kakao_callback'),
    path('kakao/login/finish/', KakaoLogin.as_view(), name='kakao_login_todjango'),
]
urlpatterns += [
    path('test_login/', UserTestAuthAPI.as_view(), name='user_test_login'),
    path('test_sleep/', MytestAPI.as_view()),
]
if os.environ.get("DEV") == 'TRUE':
    urlpatterns += [
        path('test_login/', UserTestAuthAPI.as_view(), name='user_test_login'),
        path('test_sleep/', MytestAPI.as_view()),
    ]
