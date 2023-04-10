import os

from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path, include
from drf_spectacular.views import SpectacularAPIView, SpectacularSwaggerView, SpectacularRedocView

urlpatterns = [
    path('api/user/', include('allauth.urls')),
    path('api/user/', include('users.urls')),
    path('api/novel/', include('novels.urls')),
    path('api/schema/', SpectacularAPIView.as_view(), name='schema'),

]
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
if os.environ.get("DEV") == 'TRUE':
    urlpatterns += [
        path('silk/', include('silk.urls', namespace='silk')),
        path('api/schema/swagger-ui/', SpectacularSwaggerView.as_view(url_name='schema'), name='swagger-ui'),
        path('api/schema/redoc/', SpectacularRedocView.as_view(url_name='schema'), name='redoc'),
    ]
