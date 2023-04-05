from rest_framework.throttling import UserRateThrottle


class LikeRateThrottle(UserRateThrottle):
    scope = 'like'
