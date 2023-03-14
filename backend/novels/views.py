from rest_framework.generics import CreateAPIView

from novels.models import NovelComment, Novel
from novels.serializers import NovelCommentCreateSerializer


class CreateNovelCommentAPI(CreateAPIView):
    queryset = Novel.objects.all()
    serializer_class = NovelCommentCreateSerializer()
