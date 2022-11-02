import jwt

from thundervolt.settings import SECRET_KEY

token = ''

result = jwt.decode(token, SECRET_KEY, 'HS256')

print(result)