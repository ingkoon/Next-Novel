import json
import os
import time

import requests
from django.core.cache import cache
from django.core.files.base import ContentFile
from django.db import transaction
from django.db.models import QuerySet, F
from django.shortcuts import get_object_or_404
from rest_framework import status, parsers
from rest_framework.filters import SearchFilter
from rest_framework.generics import CreateAPIView, RetrieveAPIView, RetrieveDestroyAPIView, ListCreateAPIView, \
    ListAPIView, DestroyAPIView
from rest_framework.pagination import CursorPagination
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.viewsets import ModelViewSet

from nextnovel.exceptions import RequestAIServerError
from nextnovel.permissions import IsOwnerOrReadOnly
from nextnovel.settings import DEV
from nextnovel.throttles import LikeRateThrottle
from novels.models import NovelComment, Novel, NovelLike, Genre, NovelContent, NovelContentImage, NovelStats
from novels.serializers import NovelPreviewSerializer, \
    NovelCommentSerializer, NovelLikeSerializer, NovelListSerializer, NovelStartSerializer, NovelContinueSerializer, \
    NovelEndSerializer, NovelReadSerializer, NovelCoverImageSerializer, NovelContentQuestionSerializer, \
    NovelCompleteSerializer, NovelDetailSerializer, NovelContentSerializer, NovelImageSerializer
from users.models import User

url = os.environ.get("AI_URL", "http://j8a502.p.ssafy.io:8001/")

start_url = url + "novel/start"
question_url = url + "novel/question"
sequence_url = url + "novel/sequence"
end_url = url + "novel/end"
image_url = url + "novel/image"


def retrieve_question_from_ai_json(dialog_history):
    data = {
        "dialog_history": json.dumps(dialog_history)
    }

    response = requests.post(question_url, data=data)
    if response.status_code != 200:
        raise RequestAIServerError
    return response.json()


def novel_content_with_query(response, novel_content):
    query1 = response.get("query1")
    query2 = response.get("query2")
    query3 = response.get("query3")
    novel_content.query1 = query1
    novel_content.query2 = query2
    novel_content.query3 = query3
    return novel_content


def get_next_novel_content(novel_content, novel):
    step = novel_content.step
    step += 1
    return NovelContent.objects.create(step=step, novel=novel)


class NovelRecAPI(ListAPIView):
    queryset = Novel.objects.all().filter(status=Novel.Status.FINISHED)
    serializer_class = NovelPreviewSerializer

    def get_queryset(self):
        queryset = self.queryset.all().select_related("author", "novelstats")
        return queryset.order_by('?')[:5]


class NovelPreviewAPI(RetrieveAPIView):
    queryset = Novel.objects.all().filter(status=Novel.Status.FINISHED)
    serializer_class = NovelPreviewSerializer
    lookup_url_kwarg = 'novel_id'

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context.update({"request": self.request})
        return context

    def get_queryset(self):
        queryset = self.queryset.select_related('author', 'novelstats')

        return queryset


def novel_hit(novel: Novel, user: User):
    if user.is_anonymous:
        return None
    novel.novelstats.hit_count = F('hit_count') + 1
    novel.novelstats.save()


class NovelDetailAPI(RetrieveDestroyAPIView):
    queryset = Novel.objects.all().select_related("author")
    serializer_class = NovelReadSerializer
    permission_classes = [IsOwnerOrReadOnly]
    lookup_url_kwarg = 'novel_id'

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()

        novel_content = NovelContent.objects \
            .filter(novel=instance) \
            .prefetch_related("novelcontentimage_set") \
            .order_by('step')

        serializer = self.get_serializer(instance=novel_content, many=True)
        serializer_novel = NovelDetailSerializer(instance=instance)
        response_data = {
            'novel': serializer_novel.data,
            'novel_detail': serializer.data
        }
        novel_hit(instance, self.request.user)

        return Response(response_data)


class NovelCommentAPI(ListCreateAPIView):
    queryset = NovelComment.objects.all()
    serializer_class = NovelCommentSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    lookup_url_kwarg = 'novel_id'

    def perform_create(self, serializer):
        novel_pk = self.kwargs.get("novel_id")
        novel = Novel.objects.get(pk=novel_pk)
        novel.novelstats.comment_count = F('comment_count') + 1
        novel.novelstats.save()

        serializer.save(novel=novel, author=self.request.user)

    def get_queryset(self):
        queryset = self.queryset
        novel_pk = self.kwargs.get("novel_id")
        novel = Novel.objects.get(pk=novel_pk)
        queryset = queryset.select_related("author").filter(novel=novel).order_by('-id')
        return queryset


class NovelCommentDeleteAPI(DestroyAPIView):
    queryset = NovelComment.objects.all()
    serializer_class = NovelCommentSerializer
    permission_classes = [IsAuthenticated, IsOwnerOrReadOnly]
    lookup_url_kwarg = 'comment_id'

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.check_object_permissions(request, instance)
        self.perform_destroy(instance)
        instance.novel.novelstats.comment_count = F('comment_count') - 1
        instance.novel.novelstats.save()
        return Response(status=status.HTTP_204_NO_CONTENT)


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
            novel.novelstats.like_count = F('like_count') - 1
            novel.novelstats.save()
            return True
        else:
            serializer.save(novel=novel, user=self.request.user)
            novel.novelstats.like_count = F('like_count') + 1
            novel.novelstats.save()
            return False

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        is_created = self.perform_create(serializer)
        if is_created:
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response({}, status=status.HTTP_204_NO_CONTENT)


class NovelListPagination(CursorPagination):
    ordering = "-id"
    page_size = 1000
    cursor_query_param = "cursor"


class NovelListAPI(ListAPIView):
    serializer_class = NovelListSerializer
    pagination_class = NovelListPagination
    filter_backends = [SearchFilter]
    search_fields = ['title', 'author__nickname']

    def get_queryset(self):
        queryset = Novel.objects.select_related('author', 'novelstats').all().filter(status=Novel.Status.FINISHED)
        genre = self.request.query_params.get('genre', None)
        if genre is not None:
            genre_value = Genre.get_value_from_label(genre)
            if genre_value is not None:
                queryset = queryset.filter(genre=genre_value)
        return queryset


class NovelStartAPI(APIView):
    parser_classes = [parsers.MultiPartParser]
    permission_classes = [IsAuthenticated]

    def post(self, request, **kwargs):
        if os.environ.get("DEMO") == 'TRUE':
            if request.user.nickname != "DEMO용":
                return Response({}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        serializer = NovelStartSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            novel, novel_content, images = serializer.save(author=request.user)

        files = []
        for image in images:
            filename = image.image.name.split('/')[-1]
            image_file = image.image.open(mode='rb')
            files.append(("images", (filename, image_file)))

        data = {
            "genre": request.data['genre']
        }

        ## 실제
        if DEV != 'TRUE':
            response = requests.post(start_url, files=files, data=data)
            if response.status_code != 200:
                raise RequestAIServerError
            response_json = response.json()
            story = response_json.pop("korean_answer")
            dialog_history = response_json.pop("dialog_history")
            response2_json = retrieve_question_from_ai_json(dialog_history)
        else:
            response_json = {
                "caption": [
                    "an illustration of a bunny holding a carrot . ",
                    "a drawing of a man lifting a barbell . ",
                    "a black and white drawing of a t - rex eating a piece of pizza . ",
                    "an image of a plane that is drawn in black ink . ",
                    "a drawing of an animal holding a leaf in it 's arms . ",
                    "a man jumping in the air to catch a ball . "
                ],
                "korean_answer": "소피아는 어느 날 지역 체육관에서 일하고 있었는데, 그녀는 한 남자 타일러를 발견하여 인상적인 무게를 들었다.그녀는 바벨을 쉽게 위아래로 들어 올리면서 도울 수 없었습니다.타일러가 세트를 마치자 소피아가 그를 쳐다보고 수줍은 미소를 주었다.\n\n그 다음날 소피아는 타일러가 혼자 앉아 피자 한 조각을 먹는 것을 보았을 때 가장 좋아하는 피자 장소에있었습니다.그녀는 그에게 접근 할 것인지 아닌지에 대해 토론했지만 위험을 감수하기로 결정했습니다.놀랍게도 타일러는 매력적이었고 즉시 쳤다.\n\n데이트 몇 주 후, 타일러는 소피아를 작은 비행기에서 놀라운 여행으로 데려 갔으며, 첫 데이트에 그녀의 그림을 보여주었습니다.그들이 산을 날아 가자 타일러는 당근으로 가장 귀여운 토끼를 보았던 들판을 지적했다.\n\n지상으로 돌아와서 타일러는 그녀를 야구와 함께 캐치 한 공원으로 데려 가서 소피아를 다시 놀라게했습니다.소피아는 인근 동물의 팔에 다채로운 잎을 발견했으며 모든 것이 제자리에 떨어지는 것처럼 도울 수 없었습니다.타일러가 공을 잡고 공을 마주 보았을 때 소피아는 자신이 그 공을 찾았다는 것을 알았습니다.",
                "dialog_history": [
                    {
                        "role": "user",
                        "content": "Act as a StoryTeller. Write an endless novel story in the genre of romance in 5 sentences based on an illustration of a bunny holding a carrot . ,a drawing of a man lifting a barbell . ,a black and white drawing of a t - rex eating a piece of pizza . ,an image of a plane that is drawn in black ink . ,a drawing of an animal holding a leaf in it 's arms . ,a man jumping in the air to catch a ball . ."
                    },
                    {
                        "role": "assistant",
                        "content": "Sophia was working at the local gym one day when she noticed a man, Tyler, lifting an impressive amount of weight. She couldn't help but watch as he effortlessly lifted the barbell up and down. As Tyler finished his set, he noticed Sophia staring at him and gave her a shy smile. \n\nThe next day, Sophia was at her favorite pizza place when she noticed Tyler sitting alone, eating a slice of pizza. She debated whether or not to approach him, but decided to take the risk. To her surprise, Tyler was charming and they immediately hit it off.\n\nAfter weeks of dating, Tyler took Sophia on a surprise trip in his small plane, which he had shown her a drawing of on their first date. As they flew over the mountains, Tyler pointed out a field where he had seen the cutest bunny with a carrot. \n\nBack on the ground, Tyler surprised Sophia again by taking her to a park where they played catch with a baseball. Sophia noticed a colorful leaf in the arms of a nearby animal and couldn't help but feel like everything was falling into place. As Tyler caught the ball and turned to face her, Sophia knew she had found the one."
                    }
                ]
            }

            story = response_json.pop("korean_answer")
            dialog_history = response_json.pop("dialog_history")

            response2_json = {
                "query1": "블랙홀 내부는 어떻게 생겼습니까?",
                "query2": "뇌는 어떻게 꿈을 꾸는가?",
                "query3": "인류 문명은 1000 년 안에 어떤 모습일까요?",
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

        caption = response_json.pop("caption")
        for i in range(len(images)):
            image = images[i]
            image.caption = caption[i]
        NovelContentImage.objects.bulk_update(images, ["caption"])

        novel_content.content = story
        novel_content.save()

        next_novel_content = get_next_novel_content(novel_content, novel)
        next_novel_content = novel_content_with_query(response2_json, next_novel_content)
        next_novel_content.save()

        novel.prompt = json.dumps(response2_json)

        novel.save()

        genre_dict = {
            1: "로맨스",
            4: "SF",
            2: "판타지",
            3: "추리",
            5: "자유"
        }

        response_data = {
            "id": novel.id,
            "step": 1,
            "story": story,
            "materials": [
                {"image": images[i].image.url, "caption": caption[i]} for i in range(len(images))
            ],
            "genre": genre_dict.get(novel.genre)
        }

        return Response(data=response_data, status=status.HTTP_200_OK)


class NovelContinueAPI(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = NovelContinueSerializer(data=request.data)

        if serializer.is_valid(raise_exception=True):
            novel, novel_content, image, selected_query = serializer.save()

        ### 실제
        if DEV != 'TRUE':
            filename = image.image.name.split('/')[-1]
            image_file = image.image.open(mode='rb')

            files = {'image': (filename, image_file)}

            dialog_history = json.loads(novel.prompt)

            data = {
                "previous_question": json.dumps(selected_query, ensure_ascii=False).encode('utf-8'),
                "dialog_history": json.dumps(dialog_history.get("dialog_history")),
            }

            response = requests.post(sequence_url, files=files, data=data)

            if response.status_code != 200:
                return Response(data={}, status=status.HTTP_408_REQUEST_TIMEOUT)
            response_json = response.json()
        ########################################################################
        else:
            response_json = {'caption': 'an image of a speech bubble in the shape of a circle . ',
                             'korean_answer': '유명한 천체 물리학 자로서 김 박사는 항상 료되었습니다.수년 동안 그는 블랙홀 안에 존재할 수있는 것에 대해 연구하고 가설을 세웠지 만 언젠가는 발견 할 것을 상상할 수 없었습니다.김 박사는 근처양의 음성 버블을 갖는 것으로 보입니다.김 박사는 답보다 더 많은 질문을 남겼으며, 그가 우주에 대해 알고 있다고 생각한 모든 것에 의문을 갖기 시작했습착하게되었습니다.',
                             'dialog_history': [{'role': 'user',
                                                 'content': "Act as a StoryTeller. Write an endless novel story in the genre of romance in 5 sentences based on an illustration of a bunny holding a carrot in its mouth . ,a drawing of a man lifting a barbell . ,a black and white drawing of a t - rex eating a piece of pizza . ,an image of a plane that is drawn in black ink . ,a drawing of an animal holding a leaf in it 's arms . ,a man jumping in the air to catch a ball . .And write a sentence that summarizes this story in 3 sentences"},
                                                {'role': 'assistant',
                                                 'content': ": Benny and Jack's relationship began with a shared love of carrots, but soon grew into a deeper bond filled with adventure and peril."},
                                                {'role': 'user',
                                                 'content': 'Ask me 3 questions I wish the answers to those questions could be depicted in pictures'},
                                                {'role': 'assistant',
                                                 'content': '1. What does the inside of a black hole look like?\n2. How does the brain process dreams?\n3. What would human civilization look like in 1000 years?'},
                                                {'role': 'user',
                                                 'content': '\'"1. 블랙홀 내부는 어떻게 생겼습니까?"\' the answer to th question is \'an image of a speech bubble in the shape of a circle . \'. Act as a Storyteller.Write a 5 sentences novel without an ending to the story.'},
                                                {'role': 'assistant',
                                                 'content': "As a renowned astrophysicist, Dr. Kim had always been fascinated by the mysteries of the universe, especially black holes. For years he had studied and hypothesized about what could possibly exist inside of a black hole, but he never could have imagined what he would one day discover. One fateful evening while observing a nearby black hole, Dr. Kim noticed a strange anomaly. The telescope screen appeared to have a speech bubble in the shape of a circle emanating from the black hole's center. Dr. Kim was left with more questions than answers, and began to question everything he thought he knew about the universe. As he delved deeper into his research, he became increasingly obsessed with deciphering the meaning behind the mysterious speech bubble."}]}
        #####################################################
        caption = response_json.pop("caption")
        story = response_json.pop("korean_answer")
        dialog_history = response_json.pop("dialog_history")
        #############
        if DEV != 'TRUE':
            response2_json = retrieve_question_from_ai_json(dialog_history)
        ## 테스트용
        else:
            response2_json = {
                "query1": "검은 구멍 안의 말풍선의 성질은 무엇이며, 그 안에는 무엇이 들어있는가?",
                "query2": "김 박사의 발견이 과학계와 일반 대중에게 미칠 영향과 어떤 반응을 불러일으킬 것인가?",
                "query3": "김 박사의 말풍선 비밀을 해제하고자 하는 집착은 그의 개인적, 전문적인 삶에 어떤 영향을 미칠 것이며, 이를 통해 도출되는 성과는 성과인가 불행인가?",
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
                    },
                    {
                        "role": "user",
                        "content": "'\"1. 블랙홀 내부는 어떻게 생겼습니까?\"' the answer to th question is 'an image of a speech bubble in the shape of a circle . '. Act as a Storyteller.Write a 5 sentences novel without an ending to the story."
                    },
                    {
                        "role": "assistant",
                        "content": "As a renowned astrophysicist, Dr. Kim had always been fascinated by the mysteries of the universe, especially black holes. For years he had studied and hypothesized about what could possibly exist inside of a black hole, but he never could have imagined what he would one day discover. One fateful evening while observing a nearby black hole, Dr. Kim noticed a strange anomaly. The telescope screen appeared to have a speech bubble in the shape of a circle emanating from the black hole's center. Dr. Kim was left with more questions than answers, and began to question everything he thought he knew about the universe. As he delved deeper into his research, he became increasingly obsessed with deciphering the meaning behind the mysterious speech bubble."
                    },
                    {
                        "role": "user",
                        "content": "Based on the story , give me 3 simple questions to proceed the next story. I wish the answers to those questions could be depicted in pictures."
                    },
                    {
                        "role": "assistant",
                        "content": "1. What is the nature of the speech bubble inside the black hole, and what does it contain?\n2. What impact will Dr. Kim's discovery have on the scientific community and the general public, and what kind of reactions will it elicit?\n3. How will Dr. Kim's obsession with unlocking the secrets of the speech bubble affect his personal and professional life, and will his quest lead to breakthroughs or disaster?"
                    }
                ]
            }
        ##################
        image.caption = caption
        image.save()

        dialog = json.dumps(response2_json)

        novel.prompt = dialog

        novel.save()

        novel_content.content = story
        novel_content.chosen_query = selected_query
        novel_content.save()

        next_novel_content = get_next_novel_content(novel_content, novel)
        next_novel_content = novel_content_with_query(response2_json, next_novel_content)
        next_novel_content.save()

        response_data = {
            "id": novel.id,
            "newMaterial": {
                "image": image.image.url,
                "caption": caption,
            },
            "step": novel_content.step,
            "story": story,

        }

        return Response(data=response_data, status=status.HTTP_200_OK)


class NovelEndAPI(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = NovelEndSerializer(data=request.data)

        if serializer.is_valid(raise_exception=True):
            novel = serializer.validated_data.get("novel_id")

            novel_content = NovelContent.objects.get(novel=novel, step=serializer.validated_data.get("step"))

        dialog_history = json.loads(novel.prompt)

        data = {
            "dialog_history": json.dumps(dialog_history.get("dialog_history"))
        }
        ######
        # 실제
        if DEV != 'TRUE':
            # print("response_started")
            response = requests.post(end_url, data=data)
            response_json = response.json()
            if response.status_code != 200:
                raise RequestAIServerError
        ##테스트
        else:
            response_json = {
                'korean_answer': '김박사의 검은 구멍 안의 말풍선에 대한 집착은 날이 갈수록 심해졌다. 그는 먹는 것을 그만두고, 자는 것을 그만두며, 스스로 돌봐주지 않았다. 그의 동료들은 그가 광기에 빠져진 것을. 그러나 일부는 그가 검은 구멍 안으로 들어가는 방법을 찾았을지도 모른다고 추측한다. 자신이 이해하려고 노력한 힘에 의해 소멸되며, 무한한 어둠에 빠져버린 것이 아닐까 걱정하는 사람도 있다.'
            }
        ####
        novel.prompt = json.dumps(dialog_history)
        novel.save()
        novel_content.content = response_json.get("korean_answer")
        novel_content.save()
        response_data = {
            "id": novel.id,
            "story": novel_content.content,
        }
        return Response(data=response_data, status=status.HTTP_200_OK)


class NovelCoverImageAPI(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = NovelCoverImageSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            novel = serializer.validated_data.get("novel_id")
            image = serializer.validated_data.get("image")

        files = {'image': (image.name, image.file)}
        response = requests.post(image_url, files=files)

        if response.status_code != 200:
            raise RequestAIServerError
        image_content = ContentFile(response.content)
        file_name = f"novel_cover_{novel.id}.png"

        novel.cover_img.save(file_name, image_content)
        novel.original_cover_img.save("original.png", image)

        novel.save()
        serializer = NovelImageSerializer(instance=novel)

        return Response(data=serializer.data)


class NovelQuestionAPI(RetrieveAPIView):
    permission_classes = [IsAuthenticated]
    queryset = NovelContent.objects.all()
    serializer_class = NovelContentQuestionSerializer

    def get_object(self):
        queryset = self.filter_queryset(self.get_queryset())
        obj = queryset.get(novel_id=self.kwargs.get('novel_id'), step=self.kwargs.get('step'))
        return obj

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        data = {
            "queries": [
                {"index": 1, "query": serializer.data.get("query1")},
                {"index": 2, "query": serializer.data.get("query2")},
                {"index": 3, "query": serializer.data.get("query3")},
            ]
        }
        return Response(data)


class NovelCompleteAPI(APIView):
    permission_classes = [IsAuthenticated, IsOwnerOrReadOnly]
    serializer_class = NovelCompleteSerializer

    def post(self, request):
        novel = get_object_or_404(Novel, pk=request.data['novel_id'])
        self.check_object_permissions(self.request, novel)
        serializer = NovelCompleteSerializer(novel, data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save(status=Novel.Status.FINISHED)

        return Response(data=serializer.data, status=status.HTTP_200_OK)
