from rest_framework import generics, status
from rest_framework.response import Response
from .models import Lead
from .serializers import LeadSerializer

class LeadCreateView(generics.CreateAPIView):
    queryset = Lead.objects.all()
    serializer_class = LeadSerializer

    def create(self, request, *args, **kwargs):
        # We can add custom logic here if needed (e.g., sending emails)
        return super().create(request, *args, **kwargs)
