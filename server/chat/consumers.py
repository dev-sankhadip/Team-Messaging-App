from channels.generic.websocket import AsyncWebsocketConsumer
import json
import os
from django.db import connection
from datetime import datetime, date
import logging

from user.jwt import checkJwt, getUsername
from room.views import generateRandomString

cursor=connection.cursor()
now = datetime.now()
today = date.today()


class ChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.room_name = self.scope['url_route']['kwargs']['room_name']
        self.room_group_name = 'chat_%s' % self.room_name

        # Join room group
        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name
        )

        await self.accept()

    async def disconnect(self, close_code):
        # Leave room group
        await self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name
        )

    # Receive message from WebSocket
    async def receive(self, text_data):
        text_data_json = json.loads(text_data)

        message = text_data_json['message']
        roomid=text_data_json['roomid']
        times=text_data_json['times']

        # creation_time = now.strftime("%H:%M")
        # creation_date =' '.join(today.strftime("%B %d, %Y").split(','))
        # creation_time_date=creation_time+' '+creation_date
        
        os.environ["DJANGO_ALLOW_ASYNC_UNSAFE"] = "true"
        
        token=text_data_json['token'].split("'")
        username=checkJwt(token[1])
        if username!='error':
            # insert chats into database
            chatid=generateRandomString()
            try:
                cursor.execute(f"insert into chat values('{chatid}','{roomid}','{username}','{message}','{times}')")
            except Exception as e:
                print(e)
                print("Insert exception")


        # Send message to room group
        await self.channel_layer.group_send(
            self.room_group_name,
            {
                'type': 'chat_message',
                'message': message
            }
        )

    # Receive message from room group
    async def chat_message(self, event):
        message = event['message']

        # Send message to WebSocket
        await self.send(text_data=json.dumps({
            'message': message
        }))