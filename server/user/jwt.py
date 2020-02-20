import jwt



def checkJwt(token):
    try:
        payload=jwt.decode(token,"SECRET_KEY",algorithm='HS256')
    except jwt.ExpiredSignatureError:
        print("Jwt expired")
    return payload['email']