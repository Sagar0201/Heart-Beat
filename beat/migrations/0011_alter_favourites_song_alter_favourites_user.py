# Generated by Django 4.0 on 2022-02-21 11:44

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('auth', '0012_alter_user_first_name_max_length'),
        ('beat', '0010_remove_favourites_song_favourites_song'),
    ]

    operations = [
        migrations.AlterField(
            model_name='favourites',
            name='song',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='user', to='beat.songs'),
        ),
        migrations.AlterField(
            model_name='favourites',
            name='user',
            field=models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='auth.user'),
        ),
    ]
