from rest_framework import serializers
from .models import Lead

class LeadSerializer(serializers.ModelSerializer):
    class Meta:
        model = Lead
        fields = [
            'id', 'lead_type', 'full_name', 'email', 
            'phone_number', 'category', 'notes', 'created_at'
        ]
        read_only_fields = ['id', 'created_at']

    def validate_phone_number(self, value):
        # Basic validation example, can be expanded
        if not value.replace('+', '').replace(' ', '').isdigit():
            raise serializers.ValidationError("Invalid phone number format.")
        return value
