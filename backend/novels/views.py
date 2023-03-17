from django.db.models import QuerySet
from rest_framework.generics import CreateAPIView, RetrieveAPIView, RetrieveDestroyAPIView

from novels.models import NovelComment, Novel
from novels.serializers import NovelCommentCreateSerializer, NovelPreviewSerializer, NovelDetailSerializer


class CreateNovelCommentAPI(CreateAPIView):
    queryset = Novel.objects.all()
    serializer_class = NovelCommentCreateSerializer()


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
