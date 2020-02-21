from django.views.decorators.csrf import csrf_exempt
from django.http import HttpResponse, HttpResponseBadRequest, HttpResponseNotFound, JsonResponse
from django.db import connection
from .models import UserModel
import json,jwt
from .jwt import checkJwt, getUsername



@csrf_exempt
def login(request):
    if request.method=='POST':
        # cursor=connection.cursor()
        # cursor.execute('select * from user_usermodel')
        # row=cursor.fetchone()
        # print(row)
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
                    'token':f'{jwt_token}'
                }
                return JsonResponse(data)
            else:
                return HttpResponse(status=401)
        except Exception as e:
            return HttpResponseNotFound()
    else:
        return HttpResponseBadRequest('<p>Not allowed</p>')


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
        return HttpResponseBadRequest('<p>Not allowed</p>')

@csrf_exempt
def checkLoginStatus(request):
    if request.method=='GET':
        token=request.headers['Authorization'].split("'")
        email=checkJwt(token[1])
        username=getUsername(email)
        if username:
            print('valid')
            return HttpResponse('ok', status=200)
        else:
            print('invalid')
            return HttpResponse(status=401)