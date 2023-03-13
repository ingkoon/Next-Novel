from dj_rest_auth.registration.serializers import RegisterSerializer as DjRestAuthRegisterSerializer
from django.contrib.auth import get_user_model
from rest_framework import serializers


class RegisterSerializer(DjRestAuthRegisterSerializer):
    pass


class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()
        fields = ['profile_pic', 'nickname', 'created_at']
