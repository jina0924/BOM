import jwt

from thundervolt.settings import SECRET_KEY

token = request.META.get('HTTP_AUTHORIZATION')

result = jwt.decode(token, SECRET_KEY, 'HS256')

print(result)