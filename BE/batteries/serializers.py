from rest_framework import serializers
from .models import Bms, BmsStatus, Battery, BatteryStatus


class BmsStatusSerializer(serializers.ModelSerializer):

    class BatterySerializer(serializers.ModelSerializer):
        
        class Meta:
            model = Battery
            fields = ('id', 'bms_id',)

    battery_set = BatterySerializer(many=True, read_only=True)

    now = serializers.DateTimeField(format='%Y-%m-%d %H:%M:%S')

    class Meta:
        model = BmsStatus
        fields = ('id', 'battery_set', 'temperature', 'now', 'bms_id',)