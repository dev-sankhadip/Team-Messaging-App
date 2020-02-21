from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('chat/', include('chat.urls')),
    path('user/', include('user.urls')),
    path('room/',include('room.urls')),
    path('admin/', admin.site.urls),
]
