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
    isWarning = serializers.BooleanField(source='is_warning', default=False)

    class Meta:
        model = Patient
        fields = ('id', 'ward', 'user', 'name', 'number', 'hospitalizedDate', 'dischargedDate', 'birth', 'sex', 'nokName', 'nokPhonenumber', 'userType', 'doctor', 'isWarning',)


class PatientDetailSerializer(serializers.ModelSerializer):

    class WardSerializer(serializers.ModelSerializer):

        class Meta:
            model = Ward
            fields = ('id', 'number',)

    class DoctorSerializer(serializers.ModelSerializer):

        class Meta:
            model = Doctor
            fields = ('id', 'name',)
    
    ward = WardSerializer(read_only=True)
    doctor = DoctorSerializer(read_only=True)
    nokName = serializers.CharField(source='nok_name')
    nokPhonenumber = serializers.CharField(source='nok_phonenumber')
    userType = serializers.CharField(source='user_type', default='patient')

    class Meta:
        model = Patient
        fields = ('id', 'ward', 'name', 'number', 'birth', 'sex', 'nokName', 'nokPhonenumber', 'userType', 'doctor',)


class WardDetailSerializer(serializers.ModelSerializer):

    class UserSerializer(serializers.ModelSerializer):

        class Meta:
            model = User
            fields = ('id', 'username',)
    
    user = UserSerializer(read_only=True)
    
    patientCount = serializers.IntegerField()
    doctorCount = serializers.IntegerField()
    nurseCount = serializers.IntegerField(source='nurse_set.count', read_only=True)
    utilization = serializers.IntegerField()

    class Meta:
        model = Ward
        fields = ('id', 'user', 'number', 'patientCount', 'nurseCount', 'doctorCount', 'utilization',)


class TemperatureSerializer(serializers.ModelSerializer):

    class Meta:
        model = PatientStatus
        fields = ('temperature', 'now',)


class BpmSerializer(serializers.ModelSerializer):

    class Meta:
        model = PatientStatus
        fields = ('bpm', 'now',)


class OxygenSaturationSerializer(serializers.ModelSerializer):

    oxygenSaturation = serializers.IntegerField(source='oxygen_saturation')

    class Meta:
        model = PatientStatus
        fields = ('oxygenSaturation', 'now',)


class NurseSerializer(serializers.ModelSerializer):

    class Meta:
        model = Nurse
        fields = ('id', 'name', 'image', 'phonenumber', 'email', 'position',)


class DoctorSerializer(serializers.ModelSerializer):

    class Meta:
        model = Doctor
        fields = '__all__'


class HealthSerializer(serializers.ModelSerializer):

    체온 = serializers.FloatField(source='temperature')
    심박수 = serializers.IntegerField(source='bpm')
    산소포화도 = serializers.IntegerField(source='oxygen_saturation')
    시간 = serializers.DateTimeField(source='now', format='%Y-%m-%d %H:%M:%S')

    class Meta:
        model = PatientStatus
        fields = ('체온', '심박수', '산소포화도', '시간',)


class PatientStatusSerializer(serializers.ModelSerializer):

    class PatientSerializer(serializers.ModelSerializer):
        
        class Meta:
            model = Patient
            fields = '__all__'

    patient = PatientSerializer(read_only=True)

    class Meta:
        model = PatientStatus
        fields = '__all__'


class PatientListSerializer(serializers.ModelSerializer):

    class DoctorSerializer(serializers.ModelSerializer):

        class Meta:
            model = Doctor
            fields = ('id', 'name',)

    temperature = serializers.FloatField()
    bpm = serializers.IntegerField()
    oxygenSaturation = serializers.IntegerField()
    nokName = serializers.CharField(source='nok_name')
    nokPhonenumber = serializers.CharField(source='nok_phonenumber')
    doctor = DoctorSerializer(read_only=True)
    isWarning = serializers.BooleanField(source='is_warning', default=False)

    # patientstatus_set = PatientStatusSerializer(many=True, read_only=True)

    class Meta:
        model = Patient
        fields = ('id', 'number', 'name', 'sex', 'temperature', 'bpm', 'oxygenSaturation', 'nokName', 'nokPhonenumber', 'doctor', 'isWarning',)

