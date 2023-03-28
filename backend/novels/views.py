import io
import json
import random
from io import BytesIO

import requests
from PIL.Image import Image
from django.core.files.uploadedfile import InMemoryUploadedFile
from django.db.models import QuerySet, F
from rest_framework import status, parsers
from rest_framework.filters import SearchFilter
from rest_framework.generics import CreateAPIView, RetrieveAPIView, RetrieveDestroyAPIView, ListCreateAPIView, \
    ListAPIView
from rest_framework.pagination import CursorPagination
from rest_framework.response import Response
from rest_framework.views import APIView

from nextnovel.throttles import LikeRateThrottle
from novels.models import NovelComment, Novel, NovelLike, Genre, NovelContent
from novels.serializers import NovelPreviewSerializer, NovelDetailSerializer, \
    NovelCommentSerializer, NovelLikeSerializer, NovelListSerializer, NovelStartSerializer, NovelContinueSerializer


def next_novel_content(novel_content):
    step = novel_content.step
    novel = novel_content.novel
    step += 1
    return NovelContent.objects.create(step=step, novel=novel)


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

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        instance.novelstats.hit_count = F('hit_count') + 1
        instance.novelstats.save()
        return Response(serializer.data)


class NovelCommentAPI(ListCreateAPIView):
    queryset = NovelComment.objects.all()
    serializer_class = NovelCommentSerializer
    lookup_url_kwarg = 'novel_id'

    def perform_create(self, serializer):
        novel_pk = self.kwargs.get("novel_id")
        novel = Novel.objects.get(pk=novel_pk)
        novel.novelstats.comment_count = F('comment_count') + 1
        novel.novelstats.save()
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

class NovelListPagination(CursorPagination):
    ordering = "-id"
    page_size = 12
    cursor_query_param = "cursor"


class NovelListAPI(ListAPIView):
    serializer_class = NovelListSerializer
    pagination_class = NovelListPagination
    filter_backends = [SearchFilter]
    search_fields = ['title', 'author__nickname']

    def get_queryset(self):
        queryset = Novel.objects.select_related('author', 'novelstats').all()
        genre = self.request.query_params.get('genre', None)
        if genre is not None:
            genre_value = Genre.get_value_from_label(genre)
            if genre_value is not None:
                queryset = queryset.filter(genre=genre_value)
        return queryset


class NovelStartAPI(APIView):
    parser_classes = [parsers.MultiPartParser]

    def post(self, request, **kwargs):
        serializer = NovelStartSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            novel, novel_content, images = serializer.save(author=request.user)
        print(novel, novel_content, images)
        images = request.FILES.getlist('images')
        files = []
        for image in images:
            files.append(("images", (image.name, image.file, image.content_type)))

        url = "http://j8a502.p.ssafy.io:8001/"
        start_url = url + "novel/start"
        query_url = url + "novel/question"
        data = {
            "genre": request.data['genre']
        }

        # response = requests.post(start_url, files=files, data=data)
        response_json = {
            "korean_answer": "옛날 옛적에, 베니라는 토끼가 다른 모든 것보다 당근을 좋아했습니다.어느 날, 자신이 좋아하는 간식을 곤경에 빠뜨리는 동안 그는 공원에서 바벨을 들고있는 Jack이라는 남자를 만났습니다.Jack은 Benny의 당근에 대한 사랑에 깊은 인상을 받았으며 빨리 친구가되었습니다.어느 날, 검은 색 잉크로 그려진 비행기에서 날아가는 동안 그들은 피자 조각을 먹는 t-rex의 검은 색과 흰색 그림을 우연히 발견했습니다.그들의 두려움에도 불구하고, 베니와 잭은 T-Rex의 진노에서 탈출했으며 살아 있다는 것에 감사했습니다.그날부터 그들은 세상을 계속 탐험했고 공을 잡기 위해 공중에서 점프하는 남자를 목격하는 등 다른 모험을 만났습니다.",
            "dialog_history": [
                {
                    "role": "user",
                    "content": "Act as a StoryTeller. Write an endless novel story in the genre of romance in 5 sentences based on an illustration of a bunny holding a carrot in its mouth . ,a drawing of a man lifting a barbell . ,a black and white drawing of a t - rex eating a piece of pizza . ,an image of a plane that is drawn in black ink . ,a drawing of an animal holding a leaf in it 's arms . ,a man jumping in the air to catch a ball . .And write a sentence that summarizes this story in 3 sentences"
                },
                {
                    "role": "assistant",
                    "content": ": Benny and Jack's relationship began with a shared love of carrots, but soon grew into a deeper bond filled with adventure and peril."
                }
            ]
        }
        story = response_json.pop("korean_answer")
        # print(story)
        # print(json.dumps(response_json['dialog_history']))
        # print(response_json, 123123)
        dt = {
            "dialog_history": json.dumps(response_json["dialog_history"])
        }
        # print(dt)
        # print(json.dumps(response_json))

        # response2 = requests.post(query_url, data=dt)
        response2_json = {
            "query1": "1. 블랙홀 내부는 어떻게 생겼습니까?",
            "query2": "2. 뇌는 어떻게 꿈을 꾸는가?",
            "query3": "3. 인류 문명은 1000 년 안에 어떤 모습일까요?",
            "dialog_history": [
                {
                    "role": "user",
                    "content": "Act as a StoryTeller. Write an endless novel story in the genre of romance in 5 sentences based on an illustration of a bunny holding a carrot in its mouth . ,a drawing of a man lifting a barbell . ,a black and white drawing of a t - rex eating a piece of pizza . ,an image of a plane that is drawn in black ink . ,a drawing of an animal holding a leaf in it 's arms . ,a man jumping in the air to catch a ball . .And write a sentence that summarizes this story in 3 sentences"
                },
                {
                    "role": "assistant",
                    "content": ": Benny and Jack's relationship began with a shared love of carrots, but soon grew into a deeper bond filled with adventure and peril."
                },
                {
                    "role": "user",
                    "content": "Ask me 3 questions I wish the answers to those questions could be depicted in pictures"
                },
                {
                    "role": "assistant",
                    "content": "1. What does the inside of a black hole look like?\n2. How does the brain process dreams?\n3. What would human civilization look like in 1000 years?"
                }
            ]
        }

        novel_content.content = story
        novel_content.save()
        next_content = next_novel_content(novel_content)

        query1 = response2_json.pop("query1")
        query2 = response2_json.pop("query2")
        query3 = response2_json.pop("query3")

        next_content.query1 = query1
        next_content.query2 = query2
        next_content.query3 = query3
        next_content.save()

        dialog = json.dumps(response2_json)
        novel.prompt = dialog
        novel.save()

        response_data = {
            "id": novel.id,
            "step": 1,
            "story": story,
            "query": {
                "1": query1,
                "2": query2,
                "3": query3
            }
        }
        return Response(data=response_data, status=status.HTTP_200_OK)


class NovelContinueAPI(APIView):

    def post(self, request):
        """
        step, novel_id ,query (int),(image)

        """
        serializer = NovelContinueSerializer(data=request.data)

        if serializer.is_valid(raise_exception=True):
            novel, novel_content, image, selected_query = serializer.save()
        url = "http://j8a502.p.ssafy.io:8001/"
        # url = "http://host.docker.internal:8001/"
        sequence_url = url + "novel/sequence"

        ### 실제

        filename = image.image.name.split('/')[-1]
        content_type = f"image/{filename.split('.')[1]}"
        image_file = image.image.open(mode='r')
        img_byte_arr = io.BytesIO
        image_file.save(img_byte_arr)
        img_byte_arr = img_byte_arr.getvalue()
        print(img_byte_arr)
        files = {'image': (filename, image_file)}
        # images = request.FILES.getlist('image')
        # files = []
        # for image in images:
        #     files.append(("images", (image.name, image.file, image.content_type)))

        dialog_history = json.loads(novel.prompt)
        # dialog_history = {
        #     "query1": "1. 블랙홀 내부는 어떻게 생겼습니까?",
        #     "query2": "2. 뇌는 어떻게 꿈을 꾸는가?",
        #     "query3": "3. 인류 문명은 1000 년 안에 어떤 모습일까요?",
        #     "dialog_history": [
        #         {
        #             "role": "user",
        #             "content": "Act as a StoryTeller. Write an endless novel story in the genre of romance in 5 sentences based on an illustration of a bunny holding a carrot in its mouth . ,a drawing of a man lifting a barbell . ,a black and white drawing of a t - rex eating a piece of pizza . ,an image of a plane that is drawn in black ink . ,a drawing of an animal holding a leaf in it 's arms . ,a man jumping in the air to catch a ball . .And write a sentence that summarizes this story in 3 sentences"
        #         },
        #         {
        #             "role": "assistant",
        #             "content": ": Benny and Jack's relationship began with a shared love of carrots, but soon grew into a deeper bond filled with adventure and peril."
        #         },
        #         {
        #             "role": "user",
        #             "content": "Ask me 3 questions I wish the answers to those questions could be depicted in pictures"
        #         },
        #         {
        #             "role": "assistant",
        #             "content": "1. What does the inside of a black hole look like?\n2. How does the brain process dreams?\n3. What would human civilization look like in 1000 years?"
        #         }
        #     ]
        # }
        selected_query = "1. 블랙홀 내부는 어떻게 생겼습니까?"
        data = {
            "previous_question": json.dumps(selected_query, ensure_ascii=False).encode('utf-8'),
            "dialog_history": json.dumps(dialog_history.get("dialog_history")),
        }

        response = requests.post(sequence_url, files=files, data=data)

        print(response)

        ### 테스트용

        return Response(data={}, status=status.HTTP_200_OK)
