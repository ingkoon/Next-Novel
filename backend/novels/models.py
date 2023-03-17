from django.core.validators import MaxValueValidator, MinValueValidator
from django.db import models
from django.conf import settings


class Novel(models.Model):
    class Status(models.IntegerChoices):
        FINISHED = 1
        PENDING = 2
        WAIT_FOR_WRITE = 3

    title = models.CharField(max_length=100)
    cover_img = models.CharField(max_length=100)
    introduction = models.TextField()
    author = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
    )
    status = models.IntegerField(choices=Status.choices)
    step = models.IntegerField(
        default=1,
        validators=[
            MaxValueValidator(6),
            MinValueValidator(1)
        ]
    )
    created_at = models.DateTimeField(auto_now_add=True)


class NovelContent(models.Model):
    novel = models.ForeignKey(Novel, on_delete=models.CASCADE)
    content = models.TextField()
    step = models.IntegerField(
        validators=[
            MaxValueValidator(6),
            MinValueValidator(1)
        ]
    )

    class Meta:
        constraints = [
            models.UniqueConstraint(fields=['novel', 'step'], name='unique_novel_step')
        ]


class NovelContentImage(models.Model):
    novel_content = models.ForeignKey(NovelContent, on_delete=models.CASCADE)
    image_file = models.ImageField()
    caption = models.CharField(max_length=255, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)


class NovelComment(models.Model):
    novel = models.ForeignKey(Novel, on_delete=models.CASCADE)
    author = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
    )
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)


class NovelLike(models.Model):
    novel = models.ForeignKey(Novel, on_delete=models.CASCADE)
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
    )

    class Meta:
        constraints = [
            models.UniqueConstraint(fields=['novel', 'user'], name='unique_novel_user')
        ]


class NovelStats(models.Model):
    novel = models.OneToOneField(Novel, on_delete=models.CASCADE)
    hit_count = models.PositiveIntegerField()
    comment_count = models.PositiveIntegerField()
    like_count = models.PositiveIntegerField()
