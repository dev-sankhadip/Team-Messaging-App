from django.urls import path
from .views import createRoom,sendRooms, chats, checkInRoom


urlpatterns=[
    path('',sendRooms),
    path('create', createRoom),
    path('chats', chats),
    path('checkroom',checkInRoom)
]