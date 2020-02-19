from django.db import models

# Create your models here.

class User(models.Model):
    userid=models.AutoField
    username=models.CharField(max_length=50)
    email=models.CharField(max_length=50)
    region=models.CharField(max_length=20)
    password=models.CharField(max_length=16)

    def __str__(self):
        return self.username