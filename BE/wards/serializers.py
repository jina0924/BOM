from rest_framework import serializers
from .models import Ward, Nurse, Doctor, Patient, PatientStatus, Alert
from django.contrib.auth import get_user_model


User = get_user_model()


class WardSerializer(serializers.ModelSerializer):

    class UserSerializer(serializers.ModelSerializer):

        class Meta:
            model = User
            fields = ('id', 'username',)
    
    user = UserSerializer(read_only=True)

    class Meta:
        model = Ward
        fields = '__all__'


class PatientSerializer(serializers.ModelSerializer):

    class UserSerializer(serializers.ModelSerializer):

        class Meta:
            model = User
            fields = ('id', 'username',)

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

    class Meta:
        model = Patient
        fields = '__all__'


class WardDetailSerializer(serializers.ModelSerializer):

    class UserSerializer(serializers.ModelSerializer):

        class Meta:
            model = User
            fields = ('id', 'username',)
    
    user = UserSerializer(read_only=True)
    
    patient_count = serializers.IntegerField(source='patient_set.count', read_only=True)
    nurse_count = serializers.IntegerField(source='nurse_set.count', read_only=True)

    class Meta:
        model = Ward
        fields = '__all__'