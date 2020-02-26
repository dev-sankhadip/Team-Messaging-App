from django.views.decorators.csrf import csrf_exempt
from django.http import HttpResponse, HttpResponseBadRequest, HttpResponseNotFound, JsonResponse, HttpResponseNotAllowed
from django.db import connection
from .models import UserModel
import json,jwt
from .jwt import checkJwt, getUsername



@csrf_exempt
def login(request):
    if request.method=='POST':
        values=json.loads(request.body.decode('utf-8'))
        username=values['username']
        password=values['password']
        try:
            user=UserModel.objects.get(username=f'{username}')
            if user.password==password:
                payload = {
                    'email': user.email,
                }
                jwt_token = jwt.encode(payload, "SECRET_KEY",algorithm='HS256',)
                data={
                    'status':'200',
                    'token':f'{jwt_token}',
                    'username':f'{user.username}'
                }
                return JsonResponse(data)
            else:
                return HttpResponseBadRequest("Unauthorised")
        except Exception as e:
            return HttpResponseNotFound("User not found")
    else:
        return HttpResponseNotAllowed('<p>Not allowed</p>')


@csrf_exempt
def signup(request):
    if request.method=='POST':
        values=json.loads(request.body.decode('utf-8'))
        username=values['username']
        email=values['email']
        region=values['region']
        password=values['password']
        newUser=UserModel(username=username, email=email, region=region,password=password)
        newUser.save()
        return HttpResponse(status=201)
    else:
        return HttpResponseNotAllowed('<p>Not allowed</p>')

@csrf_exempt
def checkLoginStatus(request):
    if request.method=='GET':
        token=request.headers['Authorization'].split("'")
        username=checkJwt(token[1])
        
        if username!='error' or username!=None:
            data={
                'status':200
            }
            return JsonResponse(data)
        else:
            data={
                'status':401
            }
            return JsonResponse(data)
    else:
        return HttpResponseNotAllowed("Not allowed")