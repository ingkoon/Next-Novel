from django.urls import path

from novels.views import NovelPreviewAPI, NovelDetailAPI, NovelLikeAPI, NovelCommentAPI, NovelListAPI, \
    NovelStartAPI, NovelContinueAPI

app_name = 'novels'

urlpatterns = [
    path('<int:novel_id>/', NovelDetailAPI.as_view(), name='novel_detail'),
    path('<int:novel_id>/preview/', NovelPreviewAPI.as_view(), name='novel_preview'),
    path('<int:novel_id>/like/', NovelLikeAPI.as_view(), name='novel_like'),
    path('<int:novel_id>/comment/', NovelCommentAPI.as_view(), name='novel_like'),
    path('', NovelListAPI.as_view(), name='novel'),
    path('start/', NovelStartAPI.as_view(), name='novel_start'),
    path('continue/', NovelContinueAPI.as_view(), name='novel_continue')
]
