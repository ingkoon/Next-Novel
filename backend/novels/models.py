from django.db import models
from django.conf import settings


class Novel(models.Model):
    title = models.CharField(max_length=100)
    cover_img = models.CharField(max_length=100)
    author = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
    )
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)


class NovelComment(models.Model):
    novel = models.ForeignKey(Novel,on_delete=models.CASCADE)
    author = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
    )
    created_at = models.DateTimeField(auto_now_add=True)


class NovelLike(models.Model):
    novel = models.ForeignKey(Novel,on_delete=models.CASCADE)
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
    )


class NovelStats(models.Model):
    novel = models.ForeignKey(Novel,on_delete=models.CASCADE)
    hit_count = models.PositiveIntegerField()
    comment_count = models.PositiveIntegerField()
    like_count = models.PositiveIntegerField()
