import jwt
from .models import UserModel


def checkJwt(token):
    try:
        payload=jwt.decode(token,"SECRET_KEY",algorithm='HS256')
        return payload['email']
    except jwt.ExpiredSignatureError:
        print("Jwt expired")

def getUsername(email):
    user=UserModel.objects.get(email=f'{email}')
    return user.username