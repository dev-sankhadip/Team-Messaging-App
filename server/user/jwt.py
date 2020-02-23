import jwt
from .models import UserModel
import logging


def checkJwt(token):
    try:
        payload=jwt.decode(token,"SECRET_KEY",algorithm='HS256')
        if payload['email']:
            try:
                user=UserModel.objects.get(email=payload['email'])
                return user.username
            except Exception as e:
                logging.error(e)
                return 'error'
    except jwt.ExpiredSignatureError as e:
        logging.error(e);
        return 'error';
    except jwt.InvalidSignatureError:
        logging.error(e);
        return 'error';

def getUsername(email):
    try:
        user=UserModel.objects.get(email=email)
        return user.username
    except Exception as e:
        logging.error(e)
        return 'error'