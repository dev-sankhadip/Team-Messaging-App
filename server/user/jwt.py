import jwt
from .models import UserModel


def checkJwt(token):
    try:
        payload=jwt.decode(token,"SECRET_KEY",algorithm='HS256')
        return payload['email']
    except jwt.ExpiredSignatureError:
        print("Jwt expired")
    except jwt.InvalidSignatureError:
        print("JWT error");

def getUsername(email):
    try:
        user=UserModel.objects.get(email=email)
        return user.username
    except Exception as e:
        print(e)
        print("User does not exist")