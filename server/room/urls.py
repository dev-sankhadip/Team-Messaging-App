from django.urls import path
from .views import createRoom


urlpatterns=[
    path('create', createRoom)
]