from django.views.decorators.csrf import csrf_exempt
from django.http import HttpResponse, HttpResponseBadRequest
from .models import UserModel
import json




@csrf_exempt
def login(request):
    if request.method=='POST':
        values=json.loads(request.body.decode('utf-8'))
        print(values['email'])
        return HttpResponse('hello')
    else:
        return HttpResponseBadRequest('<p>Methods not allowed</p>')


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
        return HttpResponseBadRequest('<p>Method not allowed</p>')