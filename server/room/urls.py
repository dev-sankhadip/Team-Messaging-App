from django.urls import path
from .views import createRoom,sendRooms, chats, checkInRoom,join_room, trending


urlpatterns=[
    path('',sendRooms),
    path('create', createRoom),
    path('chats', chats),
    path('checkroom',checkInRoom),
    path('join',join_room),
    path('tags',trending)
]