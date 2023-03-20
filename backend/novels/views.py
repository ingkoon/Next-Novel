from django.db.models import QuerySet
from rest_framework.generics import CreateAPIView, RetrieveAPIView, RetrieveDestroyAPIView, ListCreateAPIView, \
    ListAPIView

from nextnovel.throttles import LikeRateThrottle
from novels.models import NovelComment, Novel, NovelLike
from novels.serializers import NovelPreviewSerializer, NovelDetailSerializer, \
    NovelCommentSerializer, NovelLikeSerializer, NovelListSerializer


class NovelPreviewAPI(RetrieveAPIView):
    queryset = Novel.objects.all()
    serializer_class = NovelPreviewSerializer
    lookup_url_kwarg = 'novel_id'

    def get_queryset(self):
        assert self.queryset is not None, (
                "'%s' should either include a `queryset` attribute, "
                "or override the `get_queryset()` method."
                % self.__class__.__name__

        )

        queryset = self.queryset
        if isinstance(queryset, QuerySet):
            # Ensure queryset is re-evaluated on each request.
            queryset = queryset.all()

        queryset = queryset.select_related('author', 'novelstats')

        return queryset


class NovelDetailAPI(RetrieveDestroyAPIView):
    queryset = Novel.objects.all()
    serializer_class = NovelDetailSerializer
    lookup_url_kwarg = 'novel_id'


class NovelCommentAPI(ListCreateAPIView):
    queryset = NovelComment.objects.all()
    serializer_class = NovelCommentSerializer
    lookup_url_kwarg = 'novel_id'

    def perform_create(self, serializer):
        novel_pk = self.kwargs.get("novel_id")
        novel = Novel.objects.get(pk=novel_pk)
        serializer.save(novel=novel, author=self.request.user)

    def get_queryset(self):
        assert self.queryset is not None, (
                "'%s' should either include a `queryset` attribute, "
                "or override the `get_queryset()` method."
                % self.__class__.__name__

        )

        queryset = self.queryset
        if isinstance(queryset, QuerySet):
            # Ensure queryset is re-evaluated on each request.
            queryset = queryset.all()
        novel_pk = self.kwargs.get("novel_id")
        novel = Novel.objects.get(pk=novel_pk)
        queryset = queryset.select_related("author").filter(novel=novel)
        return queryset


class NovelLikeAPI(CreateAPIView):
    queryset = NovelLike.objects.all()
    serializer_class = NovelLikeSerializer
    lookup_url_kwarg = 'novel_id'
    throttle_classes = [LikeRateThrottle]

    def get_novel(self):
        novel = Novel.objects.get(pk=self.kwargs.get('novel_id'))
        return novel

    def perform_create(self, serializer):
        novel = self.get_novel()
        obj = self.get_queryset().filter(novel=novel, user=self.request.user)
        if obj:
            obj.delete()
        else:
            serializer.save(novel=novel, user=self.request.user)


# Fix me
class NovelListAPI(ListAPIView):
    serializer_class = NovelListSerializer

    def get_queryset(self):
        queryset = Novel.objects.all()
        genre = self.request.query_params.get('genre', None)
        if genre is not None:
            genre_choice = Novel.Genre.from_name(genre)
            if genre_choice is not None:
                queryset = queryset.filter(genre=genre_choice.value)
        return queryset
