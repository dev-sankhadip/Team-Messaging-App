from django.views.decorators.csrf import csrf_exempt
from django.http import HttpResponse, HttpResponseBadRequest, HttpResponseNotFound
from .models import UserModel
import json




@csrf_exempt
def login(request):
    if request.method=='POST':
        values=json.loads(request.body.decode('utf-8'))
        username=values['username']
        password=values['password']
        try:
            user=UserModel.objects.get(username=username)
            if user.password==password:
                return HttpResponse(status=200)
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