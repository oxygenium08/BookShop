from rest_framework import serializers
from .models import Category, Book


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name', 'image']


class BookSerializer(serializers.ModelSerializer):
    category = serializers.PrimaryKeyRelatedField(queryset=Category.objects.all())

    class Meta:
        model = Book
        fields = ['id', 'title', 'author', 'price', 'image', 'description', 'publication_year',
                  'publisher', 'format', 'page_count', 'cover_type', 'isbn', 'category']
