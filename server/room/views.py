from django.shortcuts import render
from django.http import JsonResponse, HttpResponse
from django.views.decorators.csrf import csrf_exempt
import json

from user.jwt import checkJwt

# Create your views here.

@csrf_exempt
def createRoom(request):
    values=json.loads(request.body.decode('utf-8'))
    token=request.headers['Authorization'].split("'")
    email=checkJwt(token[1])
    return HttpResponse('200')