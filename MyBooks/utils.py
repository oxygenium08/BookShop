from MyBooks.catalog.models import Book
import os
import django
from django.conf import settings
import requests


os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'MyBooks.settings')
django.setup()

def download_image(image_url, filename):
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

def download_and_update_images():
    books = Book.objects.all()
    for book in books:
        image_url = book.image
        try:
            filename = os.path.basename(image_url)
            local_image_path = download_image(image_url, filename)

            book.image = local_image_path
            book.save()
            print(f"Изображение для книги '{book.title}' успешно обновлено.")
        except Exception as e:
            print(f"Ошибка при обработке книги '{book.title}': {e}")

download_and_update_images()