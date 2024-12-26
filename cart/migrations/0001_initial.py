# Generated by Django 5.1.3 on 2024-12-01 16:34

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('catalog', '0001_initial'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='CartItem',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('quantity', models.PositiveIntegerField(default=1)),
                ('book', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='catalog.book')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='cart_items', to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
