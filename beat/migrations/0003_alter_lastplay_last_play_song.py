# Generated by Django 4.0 on 2022-02-21 10:58

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('beat', '0002_lastplay'),
    ]

    operations = [
        migrations.AlterField(
            model_name='lastplay',
            name='last_play_song',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='last_play_song', to='beat.songs'),
        ),
    ]
