from django.urls import path
from rest_framework import routers

from novels.views import NovelPreviewAPI, NovelDetailAPI, NovelLikeAPI, NovelCommentAPI, NovelListAPI, \
    NovelStartAPI, NovelContinueAPI, NovelEndAPI, NovelRecAPI, NovelCoverImageAPI, NovelQuestionAPI, \
    NovelCommentDeleteAPI, NovelCompleteAPI

app_name = 'novels'

urlpatterns = [
    path('<int:novel_id>/', NovelDetailAPI.as_view(), name='novel_detail'),
    path('<int:novel_id>/preview/', NovelPreviewAPI.as_view(), name='novel_preview'),
    path('<int:novel_id>/like/', NovelLikeAPI.as_view(), name='novel_like'),
    path('<int:novel_id>/comment/', NovelCommentAPI.as_view(), name='novel_like'),
    path('<int:novel_id>/comment/<int:comment_id>/', NovelCommentDeleteAPI.as_view(), name='novel_comment_delete'),
    path('<int:novel_id>/step/<int:step>/', NovelQuestionAPI.as_view(), name='novel_question'),
    path('', NovelListAPI.as_view(), name='novel'),
    path('recommend/', NovelRecAPI.as_view(), name='novel_recommend'),
    path('start/', NovelStartAPI.as_view(), name='novel_start'),
    path('continue/', NovelContinueAPI.as_view(), name='novel_continue'),
    path('end/', NovelEndAPI.as_view(), name='novel_end'),
    path('cover-image/', NovelCoverImageAPI.as_view(), name='novel_cover_img_generate'),
    path('complete/', NovelCompleteAPI.as_view(), name='novel_complete')
]
