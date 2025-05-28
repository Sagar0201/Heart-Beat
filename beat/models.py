from django.db import models
from django.contrib.auth.models import User
from django.db.models.expressions import OrderBy

# Create your models here.

########### Artist ###########

class Artist(models.Model):
    artist_name = models.CharField(max_length=100)
    artist_picture = models.ImageField(upload_to="static/ArtistPhotos")

    def __str__(self):
        return f'{self.id} --> {self.artist_name}'


class Songs(models.Model):
    song_file = models.FileField(upload_to='static/Musics')
    song_image = models.ImageField(upload_to="static/images")
    song_name = models.CharField(max_length=500)
    song_language = models.CharField(max_length=500)
    artist = models.ForeignKey(Artist, on_delete=models.CASCADE, related_name='artist')
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'{self.id} --> {self.song_name} --> {self.timestamp}'
    
    class Meta:
        ordering = ('timestamp',)

class NewReleases(models.Model):
    Newsongs =  models.ForeignKey(Songs,on_delete=models.CASCADE, related_name='Newsongs')

    def __str__(self):
        return self.Newsongs.song_name

class Favourites(models.Model):
    songs =  models.ForeignKey(Songs,on_delete=models.CASCADE, related_name='songs')
    user =  models.ForeignKey(User,on_delete=models.CASCADE, related_name='user')

    def __str__(self):
        return f'{self.user} --> {self.songs}'

class LastPlay(models.Model):
    last_play_song = models.ForeignKey(Songs,on_delete=models.CASCADE, related_name='last_play_song')
    last_play_song_user = models.OneToOneField(User, on_delete=models.CASCADE)
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'{self.last_play_song_user} --> {self.last_play_song} --> {self.timestamp}'
    class Meta:
        ordering = ('timestamp',)