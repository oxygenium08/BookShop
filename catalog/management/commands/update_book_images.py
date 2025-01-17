import os
import requests
from django.core.management.base import BaseCommand
from catalog.models import Book
from django.conf import settings


class Command(BaseCommand):
    help = 'Скачивает изображения по URL и обновляет их в базе данных'

    def download_image(self, image_url, filename):
        response = requests.get(image_url, stream=True)
        if response.status_code == 200:
            media_path = os.path.join(settings.MEDIA_ROOT, 'books')
            os.makedirs(media_path, exist_ok=True)
            file_path = os.path.join(media_path, filename)

            with open(file_path, 'wb') as f:
                for chunk in response.iter_content(1024):
                    f.write(chunk)

            return os.path.join('books', filename)
        else:
            raise Exception(f"Не удалось скачать изображение: {image_url}")

    def handle(self, *args, **kwargs):
        books = Book.objects.all()
        for book in books:
            image_url = book.image.url
            try:
                if image_url.startswith('/media/belkniga'):
                    filename = os.path.basename(image_url)
                    local_image_path = self.download_image('https://' + image_url[7:], filename)
                    book.image = local_image_path
                    book.save()
                    self.stdout.write(self.style.SUCCESS(f"Изображение для книги '{book.title}' успешно обновлено."))
                else:
                    self.stdout.write(self.style.SUCCESS(f"Изображение для книги '{book.title}' уже имеет относительный путь."))
            except Exception as e:
                self.stdout.write(self.style.ERROR(f"Ошибка при обработке книги '{book.title}': {e}"))
