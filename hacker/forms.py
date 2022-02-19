from dataclasses import field
from default.models import CustomUser, WaitingList
from django import forms
from default.forms import CustomUserCreationForm, CustomUserChangeForm
from django.contrib.auth.forms import ReadOnlyPasswordHashField
from .models import HackerInfo


class CustomHackerChangeForm(CustomUserChangeForm):
    class Meta:
        model = HackerInfo
        fields = ('education','major')

        widgets = {
            'major' : forms.TextInput(attrs = { 'placeholder':'Place Holder'}),
            'education' : forms.Select(attrs = {}),
        }

 

    