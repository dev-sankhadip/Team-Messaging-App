from django.shortcuts import render
from django.http import JsonResponse, HttpResponse
from django.views.decorators.csrf import csrf_exempt
from django.db import connection
import json
import string
import random
from datetime import date
import logging


from user.jwt import checkJwt, getUsername

# Create your views here.

cursor=connection.cursor()
today = date.today()

@csrf_exempt
def createRoom(request):
    values=json.loads(request.body.decode('utf-8'))
    token=request.headers['Authorization'].split("'")
    
    username=checkJwt(token[1])
    
    if username!='error' or username!=None:
        room=values['roomName']
        tag=values['roomTags']

        tagList=tag.split(',')
        tags=', '.join('"{0}"'.format(t) for t in tagList)
        tags="{"+tags+"}"
        
        roomid=generateRandomString()
        createtion_date =' '.join(today.strftime("%B %d, %Y").split(','))
        member="{"+username+"}";
        # insert values into database
        try:
            cursor.execute(f"insert into room values('{roomid}', '{username}', '{createtion_date}', '{member}', '{room}', '{tags}')")
            data={
                    'status':'200',
                    'roomid':f'{roomid}',
            }
            return JsonResponse(data)
        except Exception as e:
            print(e)
            return HttpResponse(status=500)
    else:
        return HttpResponse(status=400)


def generateRandomString():
    N = 7
    res = ''.join(random.choices(string.ascii_uppercase + string.digits, k = N))
    print(res)
    return res

@csrf_exempt
def sendRooms(request):
        token=request.headers['Authorization'].split("'")
        username=checkJwt(token[1])
        if username!='error' or username!=None:
            try:
                cursor.execute(f"select roomid,roomname,tags from room where '{username}'=any(members)")
                rooms=cursor.fetchall()
                data={
                    'rooms':rooms,
                }
                return JsonResponse(data)
            except Exception as e:
                print(e)
                return HttpResponse(status=500)
        else:
            return HttpResponse(status=401)


@csrf_exempt
def chats(request):
    values=json.loads(request.body.decode('utf-8'))
    roomid=values['roomid']
    token=request.headers['Authorization'].split("'")
    username=checkJwt(token[1])
    if username!='error' or username!=None:
        try:
            cursor.execute(f"select * from chat where username='{username}' and roomid='{roomid}'")
            chats=cursor.fetchall()
            print(chats)
        except Exception as e:
            print(e)
            print("Database error")
        return HttpResponse(status=200)
    else:
        return HttpResponse(status=401)


@csrf_exempt
def checkInRoom(request):
    values=json.loads(request.body.decode('utf-8'))
    roomid=values['roomid']
    
    token=request.headers['Authorization'].split("'")
    username=checkJwt(token[1])
    if username!='error' or username!=None:
        try:
            cursor.execute(f"select * from room where roomid='{roomid}' and '{username}'=any(members)")
            isUser=cursor.fetchall()
            logging.info(isUser)
            return HttpResponse(status=200)
        except Exception as e:
            logging.error(e)
            return HttpResponse(status=500)
    else:
        return HttpResponse(status=401)