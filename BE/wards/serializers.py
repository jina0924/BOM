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
    userType = serializers.CharField(source='user_type', default='ward')

    class Meta:
        model = Ward
        fields = ('id', 'user', 'number', 'userType',)


class PatientSerializer(serializers.ModelSerializer):

    class UserSerializer(serializers.ModelSerializer):

        class Meta:
            model = User
            fields = ('id', 'username',)

    class WardSerializer(serializers.ModelSerializer):

        class Meta:
            model = Ward
            fields = ('id', 'number',)

    class DoctorSerializer(serializers.ModelSerializer):

        class Meta:
            model = Doctor
            fields = ('id', 'name',)
    
    user = UserSerializer(read_only=True)
    ward = WardSerializer(read_only=True)
    doctor = DoctorSerializer(read_only=True)

    hospitalizedDate = serializers.DateField(source='hospitalized_date')
    dischargedDate = serializers.DateField(source='discharged_date', default=None)
    nokName = serializers.CharField(source='nok_name')
    nokPhonenumber = serializers.CharField(source='nok_phonenumber')
    userType = serializers.CharField(source='user_type', default='patient')

    class Meta:
        model = Patient
        fields = ('id', 'ward', 'user', 'name', 'number', 'hospitalizedDate', 'dischargedDate', 'birth', 'sex', 'nokName', 'nokPhonenumber', 'userType', 'doctor',)


class WardDetailSerializer(serializers.ModelSerializer):

    class UserSerializer(serializers.ModelSerializer):

        class Meta:
            model = User
            fields = ('id', 'username',)
    
    user = UserSerializer(read_only=True)
    
    patientCount = serializers.IntegerField(source='patient_set.count', read_only=True)
    nurseCount = serializers.IntegerField(source='nurse_set.count', read_only=True)

    class Meta:
        model = Ward
        fields = '__all__'


class TemperatureSerializer(serializers.ModelSerializer):

    class Meta:
        model = PatientStatus
        fields = ('id', 'temperature', 'now',)