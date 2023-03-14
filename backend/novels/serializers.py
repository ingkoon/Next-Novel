from rest_framework import serializers

from novels.models import NovelStats, Novel, NovelComment
from users.serializers import UserCommentSerializer


class UserNovelSerializer(serializers.ModelSerializer):
    pass


class NovelStatsSerializer(serializers.ModelSerializer):
    class Meta:
        model = NovelStats
        exclude = ["novel"]


class NovelDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = Novel
        fields = "__all__"


class NovelListSerializer(serializers.ModelSerializer):
    novel_stats = NovelStatsSerializer(source="novelstats")

    class Meta:
        model = Novel
        fields = ["title", "author", "novel_stats"]


class NovelCommentCreateSerializer(serializers.ModelSerializer):
    author = UserCommentSerializer(source='author', read_only=True)

    class Meta:
        model = NovelComment
        fields = ['id', 'author', 'created_at', 'content']
        read_only_fields = ['author']
