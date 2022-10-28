from rest_framework import serializers
from .models import Ward, Nurse, Doctor, Patient, PatientStatus, Alert
from django.contrib.auth import get_user_model


User = get_user_model()


class WardSerializer(serializers.ModelSerializer):

    class UserSerializer(serializers.ModelSerializer):

        class Meta:
            model = User
            fields = ('id', 'is_superuser', 'username', 'email', 'is_staff',)
    
    user = UserSerializer(read_only=True)

    class Meta:
        model = Ward
        fields = '__all__'


class PatientSerializer(serializers.ModelSerializer):

    class UserSerializer(serializers.ModelSerializer):

        class Meta:
            model = User
            fields = ('id', 'is_superuser', 'username', 'email', 'is_staff',)

    class WardSerializer(serializers.ModelSerializer):

        class Meta:
            model = Ward
            fields = '__all__'

    class DoctorSerializer(serializers.ModelSerializer):

        class Meta:
            model = Doctor
            fields = ('id', 'name',)
    
    user = UserSerializer(read_only=True)
    ward = WardSerializer(read_only=True)
    doctor = DoctorSerializer(read_only=True)