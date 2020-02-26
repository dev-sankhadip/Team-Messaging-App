from django.shortcuts import render
from django.http import JsonResponse, HttpResponse, HttpResponseBadRequest, HttpResponseNotFound, HttpResponseServerError
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
        tags=', '.join('"{0}"'.format(t.strip()) for t in tagList)
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
            return HttpResponseServerError("Server error")
    else:
        HttpResponseNotFound("User not found")


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
                return HttpResponseServerError("Server error")
        else:
            return HttpResponseBadRequest("Unauthorised")


@csrf_exempt
def chats(request):
    values=json.loads(request.body.decode('utf-8'))
    roomid=values['roomid']
    token=request.headers['Authorization'].split("'")
    username=checkJwt(token[1])
    if username!='error' or username!=None:
        try:
            cursor.execute(f"select username, message, time from chat where roomid='{roomid}'")
            chats=cursor.fetchall()
            return JsonResponse({"status":200, "chats":chats})
        except Exception as e:
            print(e)
            print("Database error")
            return HttpResponseServerError("Server error")
    else:
        return HttpResponseBadRequest("Unauthorised")


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
            if len(isUser)>0:
                data={
                    'status':200
                }
                return JsonResponse(data)
            else:
                return HttpResponseBadRequest("Unauthorised")
        except Exception as e:
            print(e)
            return HttpResponseServerError("Server error")
    else:
        return HttpResponseBadRequest("Unauthorised")


@csrf_exempt
def join_room(request):
    values=json.loads(request.body.decode('utf-8'))
    roomid=values['roomid']
    token=request.headers['Authorization'].split("'")
    username=checkJwt(token[1])
    if username!='error' or username!=None:
        try:
            # update aa set b = array_append(b, 5) where a = 1
            cursor.execute(f"update room set members=array_append(members,'{username}') where roomid = '{roomid}'")
            return JsonResponse({'status':201})
        except Exception as e:
            print(e)
            return HttpResponseServerError("Server error")
    else:
        HttpResponseBadRequest("Unauthorised")



@csrf_exempt
def trending(request):
    try:
        # get top trending tags
        # cursor.execute('with tags as(select unnest(tags) as tagname from room) select count(tagname),tagname from tags group by tagname')
        cursor.execute('with tags as(select unnest(tags) as tagname from room) select count(tagname),tagname from tags group by tagname order by count(tagname) desc')
        tags=cursor.fetchall()
        # get trending rooms
        cursor.execute('select count(roomid), roomid from chat group by roomid order by count(roomid) desc')
        rooms=cursor.fetchall()
        # get trending username
        cursor.execute('select count(username), username from chat group by username order by count(username) desc')
        users=cursor.fetchall()

        return JsonResponse({ 'tags':tags,'rooms':rooms,'users':users })
    except Exception as e:
        return HttpResponseServerError("Server error");