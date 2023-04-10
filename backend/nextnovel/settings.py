import os
from datetime import timedelta
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent

SECRET_KEY = os.environ.get("SECRET_KEY", "secret")
DEV = os.environ.get("DEV")
if DEV == 'TRUE':
    DEBUG = True
    ALLOWED_HOSTS = ['*']
    INSTALLED_APPS = [
        'django.contrib.admin',
        'django.contrib.auth',
        'django.contrib.contenttypes',
        'django.contrib.sessions',
        'django.contrib.messages',
        'django.contrib.staticfiles',
        # site 설정도!
        'django.contrib.sites',
        # app
        'users',
        'novels',
        # cors
        'corsheaders',
        # Libraries
        'rest_framework',
        'rest_framework.authtoken',
        'rest_framework_simplejwt',

        'dj_rest_auth',
        'dj_rest_auth.registration',
        # allauth for registration
        'allauth',
        'allauth.account',
        'allauth.socialaccount',
        'allauth.socialaccount.providers.kakao',
        'django_seed',
        'drf_spectacular',
        'django_extensions',

        'silk',
    ]
    MIDDLEWARE = [
        'corsheaders.middleware.CorsMiddleware',
        'silk.middleware.SilkyMiddleware',
        'django.middleware.security.SecurityMiddleware',
        'django.contrib.sessions.middleware.SessionMiddleware',
        'django.middleware.common.CommonMiddleware',
        'django.middleware.csrf.CsrfViewMiddleware',
        'django.contrib.auth.middleware.AuthenticationMiddleware',
        'django.contrib.messages.middleware.MessageMiddleware',
        'django.middleware.clickjacking.XFrameOptionsMiddleware',
    ]

else:
    DEBUG = True
    USE_X_FORWARDED_HOST = True
    SECURE_PROXY_SSL_HEADER = ('HTTP_X_FORWARDED_PROTO', 'https')
    ALLOWED_HOSTS = ['j8a502.p.ssafy.io']
    INSTALLED_APPS = [
        'django.contrib.admin',
        'django.contrib.auth',
        'django.contrib.contenttypes',
        'django.contrib.sessions',
        'django.contrib.messages',
        'django.contrib.staticfiles',
        # site 설정도!
        'django.contrib.sites',
        # app
        'users',
        'novels',
        # cors
        'corsheaders',
        # Libraries
        'rest_framework',
        'rest_framework.authtoken',
        'rest_framework_simplejwt',

        'dj_rest_auth',
        'dj_rest_auth.registration',
        # allauth for registration
        'allauth',
        'allauth.account',
        'allauth.socialaccount',
        'allauth.socialaccount.providers.kakao',
        'django_seed',
        'drf_spectacular',
        'django_extensions',

        'silk',
    ]
    MIDDLEWARE = [
        'corsheaders.middleware.CorsMiddleware',
        'django.middleware.security.SecurityMiddleware',
        'django.contrib.sessions.middleware.SessionMiddleware',
        'django.middleware.common.CommonMiddleware',
        'django.middleware.csrf.CsrfViewMiddleware',
        'django.contrib.auth.middleware.AuthenticationMiddleware',
        'django.contrib.messages.middleware.MessageMiddleware',
        'django.middleware.clickjacking.XFrameOptionsMiddleware',
    ]

ROOT_URLCONF = 'nextnovel.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'nextnovel.wsgi.application'

DATABASES = {
    "default": {
        "ENGINE": os.environ.get("SQL_ENGINE", "django.db.backends.sqlite3"),
        "NAME": os.environ.get("SQL_DATABASE", BASE_DIR / "db.sqlite3"),
        "USER": os.environ.get("SQL_USER", "user"),
        "PASSWORD": os.environ.get("SQL_PASSWORD", "password"),
        "HOST": os.environ.get("SQL_HOST", "localhost"),
        "PORT": os.environ.get("SQL_PORT", "5432"),
    }
}

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]
LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'Asia/Seoul'

USE_I18N = True

USE_TZ = False

# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/4.1/howto/static-files/


# Default primary key field type
# https://docs.djangoproject.com/en/4.1/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

## 아래는 social account를 위한 세팅들
SITE_ID = 1

AUTH_USER_MODEL = 'users.User'

ACCOUNT_USER_MODEL_USERNAME_FIELD = None  # username 필드 사용 x
ACCOUNT_EMAIL_REQUIRED = True  # email 필드 사용 o
ACCOUNT_USERNAME_REQUIRED = False  # username 필드 사용 x
ACCOUNT_AUTHENTICATION_METHOD = 'email'

REST_FRAMEWORK = {
    'DEFAULT_PERMISSION_CLASSES': (
        'rest_framework.permissions.AllowAny',  # 누구나 접근
    ),

    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework_simplejwt.authentication.JWTAuthentication',

    ),

    'DEFAULT_SCHEMA_CLASS': 'drf_spectacular.openapi.AutoSchema',

    'DEFAULT_THROTTLE_RATES': {
        'like': '1/s',
    }
}
SIMPLE_JWT = {
    'ACCESS_TOKEN_LIFETIME': timedelta(days=24),
    'REFRESH_TOKEN_LIFETIME': timedelta(days=30),
    'ROTATE_REFRESH_TOKENS': False,
    'BLACKLIST_AFTER_ROTATION': False,
    'UPDATE_LAST_LOGIN': False,

    'ALGORITHM': 'HS256',
    'SIGNING_KEY': SECRET_KEY,
    'VERIFYING_KEY': None,
    'AUDIENCE': None,
    'ISSUER': None,
    'JWK_URL': None,
    'LEEWAY': 0,

    'AUTH_HEADER_TYPES': ('Bearer',),
    'AUTH_HEADER_NAME': 'HTTP_AUTHORIZATION',
    'USER_ID_FIELD': 'id',
    'USER_ID_CLAIM': 'user_id',
    'USER_AUTHENTICATION_RULE': 'rest_framework_simplejwt.authentication.default_user_authentication_rule',

    'AUTH_TOKEN_CLASSES': ('rest_framework_simplejwt.tokens.AccessToken',),
    'TOKEN_TYPE_CLAIM': 'token_type',
    'TOKEN_USER_CLASS': 'rest_framework_simplejwt.models.TokenUser',

    'JTI_CLAIM': 'jti',

    'SLIDING_TOKEN_REFRESH_EXP_CLAIM': 'refresh_exp',
    'SLIDING_TOKEN_LIFETIME': timedelta(minutes=5),
    'SLIDING_TOKEN_REFRESH_LIFETIME': timedelta(days=1),
}
REST_AUTH = {
    'LOGIN_SERIALIZER': 'dj_rest_auth.serializers.LoginSerializer',
    'TOKEN_SERIALIZER': 'dj_rest_auth.serializers.TokenSerializer',
    'JWT_SERIALIZER': 'dj_rest_auth.serializers.JWTSerializer',
    'JWT_SERIALIZER_WITH_EXPIRATION': 'dj_rest_auth.serializers.JWTSerializerWithExpiration',
    'JWT_TOKEN_CLAIMS_SERIALIZER': 'rest_framework_simplejwt.serializers.TokenObtainPairSerializer',
    'USER_DETAILS_SERIALIZER': 'users.serializers.UserKAKAOLoginRetrieveSerializer',
    'PASSWORD_RESET_SERIALIZER': 'dj_rest_auth.serializers.PasswordResetSerializer',
    'PASSWORD_RESET_CONFIRM_SERIALIZER': 'dj_rest_auth.serializers.PasswordResetConfirmSerializer',
    'PASSWORD_CHANGE_SERIALIZER': 'dj_rest_auth.serializers.PasswordChangeSerializer',

    # 'REGISTER_SERIALIZER': 'dj_rest_auth.registration.serializers.RegisterSerializer',
    'REGISTER_SERIALIZER': 'users.serializers.RegisterSerializer',

    'REGISTER_PERMISSION_CLASSES': ('rest_framework.permissions.AllowAny',),

    'TOKEN_MODEL': 'rest_framework.authtoken.models.Token',
    'TOKEN_CREATOR': 'dj_rest_auth.utils.default_create_token',

    'PASSWORD_RESET_USE_SITES_DOMAIN': False,
    'OLD_PASSWORD_FIELD_ENABLED': False,
    'LOGOUT_ON_PASSWORD_CHANGE': False,
    'SESSION_LOGIN': False,
    'USE_JWT': True,

    'JWT_AUTH_COOKIE': None,
    'JWT_AUTH_REFRESH_COOKIE': None,
    'JWT_AUTH_REFRESH_COOKIE_PATH': '/',
    'JWT_AUTH_SECURE': False,
    'JWT_AUTH_HTTPONLY': False,
    'JWT_AUTH_SAMESITE': 'Lax',
    'JWT_AUTH_RETURN_EXPIRATION': False,
    'JWT_AUTH_COOKIE_USE_CSRF': False,
    'JWT_AUTH_COOKIE_ENFORCE_CSRF_ON_UNAUTHENTICATED': False,
}

KAKAO_CLIENT_ID = os.environ.get("SOCIAL_AUTH_KAKAO_CLIENT_ID", None)
KAKAO_SECRET = os.environ.get("SOCIAL_AUTH_KAKAO_SECRET", None)
STATE = os.environ.get("STATE", "vasdvdsfav")
REDIS_PASSWORD = os.environ.get('REDIS_PASSWORD', None)

STATIC_URL = '/static-django/'
STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')

MEDIA_URL = '/media/'
MEDIA_ROOT = os.path.join(BASE_DIR, 'mediafiles')

## CACHE
CACHES = {
    'default': {
        'BACKEND': 'django.core.cache.backends.redis.RedisCache',
        'LOCATION': f'redis://default:{REDIS_PASSWORD}@redis:6379',
    }
}
## social provider
SOCIALACCOUNT_PROVIDERS = {
    "kakao": {
        "APP": {
            "client_id": KAKAO_CLIENT_ID,
            "secret": KAKAO_SECRET,
        },
    },
}

## CORS
CORS_ALLOW_ALL_ORIGINS = True
CORS_ALLOW_CREDENTIALS = True
