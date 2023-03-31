from dj_rest_auth.registration.serializers import RegisterSerializer as DjRestAuthRegisterSerializer
from django.contrib.auth import get_user_model
from rest_framework import serializers


class RegisterSerializer(DjRestAuthRegisterSerializer):
    pass


class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()
        fields = ['profile_image', 'nickname', 'created_at']
        read_only_fields = ['created_at']


class UserCommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()
        fields = ['profile_image', 'nickname', ]


class UserNicknameSerializer(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()
        fields = ['nickname', ]


class UserKAKAOLoginRetrieveSerializer(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()
        fields = ['nickname', 'pk']
