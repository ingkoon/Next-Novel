from rest_framework import serializers

from novels.models import NovelStats, Novel, NovelComment, NovelLike, Genre, NovelContentImage, NovelContent
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
    author = UserCommentSerializer(read_only=True)

    class Meta:
        model = NovelComment
        fields = ['id', 'author', 'created_at', 'content']
        read_only_fields = ['author']


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


class NovelLikeSerializer(serializers.ModelSerializer):
    class Meta:
        model = NovelLike
        fields = ["id", ]


class NovelContentImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = NovelContentImage
        fields = ['image']


class NovelStartSerializer(serializers.Serializer):
    # images = NovelContentImageSerializer(many=True)
    images = serializers.ListField(
        child=serializers.ImageField(allow_empty_file=False, use_url=False),
        write_only=True
    )
    genre = serializers.CharField()
    author = serializers.PrimaryKeyRelatedField(read_only=True)

    def validate_genre(self, value):
        print(value)
        print(Genre.labels)
        if value in Genre.labels:
            return Genre.get_value_from_label(value)
        raise serializers.ValidationError("Not allowed Genre")

    def create(self, validated_data):
        print("create started")
        images_data = validated_data.pop('images')
        novel = Novel.objects.create(**validated_data)
        images = []
        novel_content = NovelContent.objects.create(novel=novel, step=1)
        for image_data in images_data:
            image = NovelContentImage.objects.create(novel_content=novel_content, image=image_data)
            images.append(image)
        return (novel, novel_content, images)
