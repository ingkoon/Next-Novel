from rest_framework.exceptions import APIException


class RequestAIServerError(APIException):
    status_code = 500
    default_detail = 'Connection Failed with AI server'


class RequestKAKAOServerError(APIException):
    status_code = 500
    default_detail = 'Connection Failed with KAKAO server'
