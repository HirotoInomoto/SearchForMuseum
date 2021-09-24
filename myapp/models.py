from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator

# 美術館イベントのモデル
class MuseumEvent(models.Model):
    title = models.CharField(max_length=100, unique=True)
    start_event_date = models.DateField(auto_now=False, auto_now_add=False)
    end_event_date = models.DateField(auto_now=False, auto_now_add=False)
    event_date_exception = models.CharField(max_length=200, null=True, blank=True)
    business_hours = models.CharField(max_length=150)
    museum_name = models.CharField(max_length=50)
    address = models.CharField(max_length=150)
    official_hp_link = models.URLField(max_length=300)
    rate_average = models.FloatField(
        validators=[MinValueValidator(0), MaxValueValidator(5)], null=True
    )

    def __str__(self):
        return self.title


#  イベントに対してのレビュー
class Review(models.Model):
    event = models.ForeignKey(MuseumEvent, on_delete=models.CASCADE)
    content = models.CharField(max_length=140, null=False, blank=False)
    rate = models.IntegerField(validators=[MinValueValidator(0), MaxValueValidator(5)])
    date = models.DateTimeField(auto_now=False, auto_now_add=True)

    def __str__(self):
        return str(self.date) + "投稿のレビュー"
