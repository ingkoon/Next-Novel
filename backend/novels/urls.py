from django.urls import path

from novels.views import NovelPreviewAPI, NovelDetailAPI

app_name = 'novels'

urlpatterns = [
    path('<int:novel_id>/preview/', NovelPreviewAPI.as_view(), name='novel_preview'),
    path('<int:novel_id>/', NovelDetailAPI.as_view(), name='novel_detail'),
]
