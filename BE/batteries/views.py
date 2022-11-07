from django.shortcuts import get_object_or_404
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
# from .models import 
# from .serializers import 
import jwt
from thundervolt.settings import SECRET_KEY
import datetime
from dateutil.relativedelta import relativedelta


@api_view(['GET'])
def bms(request):
    pass