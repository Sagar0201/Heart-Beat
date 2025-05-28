from django.contrib import admin
from beat.models import Artist
from beat.models import Songs
from beat.models import Favourites
from beat.models import LastPlay 
from beat.models import NewReleases
# Register your models here.
admin.site.register(Artist)
admin.site.register(Songs)
admin.site.register(Favourites)
admin.site.register(LastPlay)
admin.site.register(NewReleases)