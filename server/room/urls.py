from django.urls import path
from .views import createRoom,sendRooms


urlpatterns=[
    path('',sendRooms),
    path('create', createRoom)
]