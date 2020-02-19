from django.db import models

# Create your models here.

class UserModel(models.Model):
    userid=models.AutoField
    username=models.CharField(max_length=50)
    email=models.CharField(max_length=50)
    region=models.CharField(max_length=50)
    password=models.CharField(max_length=15)

    def __str__(self):
        return self.username