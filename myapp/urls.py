from django.urls import path
from . import views

urlpatterns = [
    path("", views.top_view, name="top"),
    path("map", views.map_view, name="map"),
    path("calendar", views.calendar_view, name="calendar"),
    path("review/<event_name>/<choice>", views.review_view, name="review"),
    path(
        "event/<int:year>/<int:month>/<int:day>",
        views.event_view,
        name="event",
    ),
    path("scraping", views.scraping, name="scraping"),
]
