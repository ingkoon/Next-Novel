from django.urls import path

from users.views import kakao_login, kakao_callback, KakaoLogin, UserProfileAPI

app_name = 'users'

urlpatterns = [
    path('',UserProfileAPI.as_view(),name='user_profile'),
    path('kakao/login', kakao_login, name='kakao_login'),
    path('kakao/callback/', kakao_callback, name='kakao_callback'),
    path('kakao/login/finish/', KakaoLogin.as_view(), name='kakao_login_todjango'),
]
