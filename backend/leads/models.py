from django.db import models
from django.utils.translation import gettext_lazy as _

class Lead(models.Model):
    class LeadType(models.TextChoices):
        TECHNICIAN = 'TECHNICIAN', _('Technician')
        CLIENT = 'CLIENT', _('Client')

    lead_type = models.CharField(
        max_length=20,
        choices=LeadType.choices,
        verbose_name=_('Lead Type')
    )
    full_name = models.CharField(max_length=255, verbose_name=_('Full Name'))
    email = models.EmailField(verbose_name=_('Email'))
    phone_number = models.CharField(max_length=20, verbose_name=_('Phone Number'))
    category = models.CharField(max_length=100, blank=True, null=True, verbose_name=_('Category/Specialty'))
    notes = models.TextField(blank=True, null=True, verbose_name=_('Notes'))
    created_at = models.DateTimeField(auto_now_add=True, verbose_name=_('Created At'))

    class Meta:
        verbose_name = _('Lead')
        verbose_name_plural = _('Leads')
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.full_name} ({self.get_lead_type_display()})"
