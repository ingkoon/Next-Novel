from django.core.validators import MaxValueValidator, MinValueValidator
from django.db import models
from django.conf import settings


class Genre(models.IntegerChoices):
    ROMANCE = 1, "romance"
    FANTASY = 2, "fantasy"
    MYSTERY = 3, "mystery"
    SF = 4, "sf"
    FREE = 5, "free"

    @classmethod
    def get_value_from_label(cls, label):
        for choice_value, choice_label in cls.choices:
            if choice_label == label:
                return choice_value
        return None


class Novel(models.Model):
    class Status(models.IntegerChoices):
        FINISHED = 1, 'Finished'
        PENDING = 2, 'Pending'
        WAIT_FOR_WRITE = 3, ' Wait_for_write'

    title = models.CharField(max_length=100, null=True)
    cover_img = models.ImageField(null=True)
    introduction = models.TextField(null=True)
    author = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
    )
    status = models.IntegerField(choices=Status.choices, default=Status.WAIT_FOR_WRITE)
    step = models.IntegerField(
        default=1,
        validators=[
            MaxValueValidator(6),
            MinValueValidator(1)
        ]
    )
    created_at = models.DateTimeField(auto_now_add=True)
    genre = models.IntegerField(choices=Genre.choices)


class NovelContent(models.Model):
    novel = models.ForeignKey(Novel, on_delete=models.CASCADE)
    content = models.TextField()
    step = models.IntegerField(
        validators=[
            MaxValueValidator(6),
            MinValueValidator(1)
        ]
    )
    query1 = models.TextField()
    query2 = models.TextField()
    query3 = models.TextField()

    class Meta:
        constraints = [
            models.UniqueConstraint(fields=['novel', 'step'], name='unique_novel_step')
        ]


class NovelContentImage(models.Model):
    novel_content = models.ForeignKey(NovelContent, on_delete=models.CASCADE)
    image = models.ImageField()
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
    hit_count = models.PositiveIntegerField(default=0)
    comment_count = models.PositiveIntegerField(default=0)
    like_count = models.PositiveIntegerField(default=0)


class NovelCreationPrompt(models.Model):
    novel = models.OneToOneField(Novel, on_delete=models.CASCADE)
    prompt = models.TextField()
