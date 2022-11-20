from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from wards.models import Ward, Patient
import jwt
from thundervolt.settings import SECRET_KEY


# 유저 타입 확인
@api_view(['GET'])
def usertype(request):

    token = request.META.get('HTTP_AUTHORIZATION')[7:]

    user_id = jwt.decode(token, SECRET_KEY, 'HS256').get('user_id')

    if Ward.objects.filter(user_id=user_id):
        user = Ward.objects.get(user_id=user_id)

    elif Patient.objects.filter(user_id=user_id):
        user = Patient.objects.get(user_id=user_id)
    
    user_type = user.user_type
    number = user.number
    
    return Response({'userType': user_type, 'number': number}, status=status.HTTP_200_OK)