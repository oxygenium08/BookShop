from django.db import models

class Category(models.Model):
    name = models.CharField(max_length=255)
    image = models.ImageField(upload_to='categories/', default='media/categories/Kak-vse-rabotaet.jpg')

    def __str__(self):
        return self.name

class Book(models.Model):
    title = models.CharField(max_length=255)
    author = models.CharField(max_length=255)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    image = models.ImageField(upload_to='books/')
    description = models.TextField()
    publication_year = models.IntegerField()
    publisher = models.CharField(max_length=255)
    format = models.CharField(max_length=50)
    page_count = models.PositiveIntegerField()
    cover_type = models.CharField(max_length=50)
    isbn = models.CharField(max_length=13)
    category = models.ForeignKey(Category, related_name='books', on_delete=models.CASCADE)

    def __str__(self):
        return self.title
