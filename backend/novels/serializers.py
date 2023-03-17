from rest_framework import serializers

from novels.models import NovelStats, Novel, NovelComment
from users.serializers import UserCommentSerializer, UserNicknameSerializer


class UserNovelSerializer(serializers.ModelSerializer):
    pass


class NovelStatsSerializer(serializers.ModelSerializer):
    class Meta:
        model = NovelStats
        exclude = ["id", "novel"]


class NovelDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = Novel
        fields = "__all__"


class NovelListSerializer(serializers.ModelSerializer):
    novel_stats = NovelStatsSerializer(source="novelstats")
    author = serializers.CharField(source="author.nickname", read_only=True)

    class Meta:
        model = Novel
        fields = ["id", "title", "author", "novel_stats"]


class NovelCommentCreateSerializer(serializers.ModelSerializer):
    author = UserCommentSerializer(source='author', read_only=True)

    class Meta:
        model = NovelComment
        fields = ['id', 'author', 'created_at', 'content']
        read_only_fields = ['author']


class NovelCommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = NovelComment
        fields = ['id', '']


class NovelPreviewSerializer(serializers.ModelSerializer):
    author = serializers.CharField(source="author.nickname", read_only=True)
    novel_stats = NovelStatsSerializer(source="novelstats")

    class Meta:
        model = Novel
        fields = ['id', 'author', 'created_at', 'novel_stats', 'title', 'cover_img']


class NovelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Novel
        fields = "__all__"
