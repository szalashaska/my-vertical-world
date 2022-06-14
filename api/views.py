from django.shortcuts import render
from django.http import HttpResponse
from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.response import Response

# Create your views here.
def main(request):
    return HttpResponse("Hello")

class RegisterUser(APIView):
    def get(self, request, format=None):
        return Response({"message": "Seems to work just fine."}, status=status.HTTP_200_OK)

