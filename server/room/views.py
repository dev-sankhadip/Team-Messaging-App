from django.shortcuts import render
from django.http import JsonResponse, HttpResponse
from django.views.decorators.csrf import csrf_exempt
from django.db import connection
import json
import string
import random
from datetime import date

from user.jwt import checkJwt, getUsername

# Create your views here.

cursor=connection.cursor()
today = date.today()

@csrf_exempt
def createRoom(request):
    values=json.loads(request.body.decode('utf-8'))
    token=request.headers['Authorization'].split("'")
    
    # verify jwt token
    email=checkJwt(token[1])
    # get username after verification
    username=getUsername(email)

    # get roomname and tags
    room=values['roomName']
    tag=values['roomTags']
    tags=tag.split(',')
    roomid=generateRandomString()
    createtion_date =' '.join(today.strftime("%B %d, %Y").split(','))
    member="{"+username+"}";

    # insert values into database
    cursor.execute(f"insert into room values('{roomid}', '{username}', '{createtion_date}', '{member}')")
    return HttpResponse(status=200)


def generateRandomString():
    N = 7
    res = ''.join(random.choices(string.ascii_uppercase + string.digits, k = N))
    print(res)
    return res