from rest_framework import serializers
from .models import Bms, BmsStatus, Battery, BatteryStatus


class BmsStatusSerializer(serializers.ModelSerializer):

    class BatterySerializer(serializers.ModelSerializer):
        
        class Meta:
            model = Battery
            fields = ('id', 'bms_id',)

    battery_set = BatterySerializer(many=True, read_only=True)

    시간 = serializers.DateTimeField(source='now', format='%Y-%m-%d %H:%M:%S')
    온도 = serializers.IntegerField(source='temperature')

    class Meta:
        model = BmsStatus
        fields = ('id', 'battery_set', '온도', '시간', 'bms_id',)