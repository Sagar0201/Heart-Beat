from django.shortcuts import render,redirect
from django.contrib import messages, auth
from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from django.contrib.auth.decorators import login_required
from .models import Artist,Songs,Favourites,LastPlay,NewReleases
from django.http import JsonResponse



# Create your views here.
@login_required(login_url="/Login/")
def home(request):
    user_id = request.user.id
    Artists=Artist.objects.all()
    Musics=Songs.objects.filter()
    NewRelease=NewReleases.objects.filter()
    LastPlaySong=LastPlay.objects.filter(last_play_song_user=user_id)
    if request.method == "POST":
        Query = request.POST['Query']
        
        if len(Query) > 78:
            SearchResults = Rentales.objects.none()
        else:
            res=None
            song_name = Songs.objects.filter(song_name__icontains=Query)
            song_language = Songs.objects.filter(song_language__icontains=Query)
            artist = Songs.objects.filter(artist__artist_name__icontains=Query)
            SearchResults = (song_name | song_language | artist).distinct()
            if len(SearchResults)>0:
                data =[]
                for pos in SearchResults:
                    item ={
                        'song_id': pos.id,
                        'song_name': pos.song_name,
                        'artist':pos.artist.artist_name,
                        'song':str(pos.song_file.url),
                        'song_image':str(pos.song_image.url),
                    }
                    data.append(item)
                res= data
            else:
                res= "No Search Results found"
            return JsonResponse({'data':res})
            
    return render(request, 'HeartBeat/home.html',{"Artists": Artists,"Musics":Musics,"LastPlaySong":LastPlaySong,"NewReleases":NewRelease})



def SignUp(request):
    if request.method == "POST":
        username = request.POST['username']
        fname = request.POST['fname']
        lname = request.POST['lname']
        email = request.POST['email']
        password = request.POST['password']

        # check for errorneous input
        if len(username) > 10:
            messages.error(request, "Plase Enter The User Name Under 10 Char.")
            return redirect('/SignUp')

        if not username.isalnum():
            messages.error(
                request, "Username should only contain letters and number")
            return redirect('/SignUp')

        if User.objects.filter(username=username).exists():
            messages.error(request, "This Username should All Ready Taken")
            return redirect('/SignUp')
        myuser = User.objects.create_user(username, email, password)
        myuser.first_name = fname
        myuser.last_name = lname
        myuser.save()
        messages.success(
            request, f"Account Created sucessfully. Your Username is {username} and Password is {password}")
    return render(request, 'Account/SignUp.html')

def Login(request):
    if request.method == "POST":
        # Get the post parameters
        loginusername = request.POST['loginusername']
        loginpassword = request.POST['loginpassword']

        user = authenticate(username=loginusername, password=loginpassword)

        if user is not None:
            if user.is_active:
                auth.login(request, user)
                return redirect("home")
            else:
                messages.error(request, "You're Account is Disable")
        else:
            messages.error(
                request, "Invalid Username Or Password please try again")
            return redirect('/Login', {"loginusername": loginusername, "loginpassword": loginpassword})

    return render(request, 'Account/Login.html')

@login_required(login_url="/Login/")
def SignOut(request):
    auth.logout(request)
    messages.success(request, "Successfully logged out")
    return redirect("Login")

@login_required(login_url="/Login/")
def Contact(request):
    user_id = request.user.id
    LastPlaySong=LastPlay.objects.filter(last_play_song_user=user_id)
    return render(request, 'HeartBeat/Contact.html',{"LastPlaySong":LastPlaySong})

@login_required(login_url="/Login/")
def About(request):
    user_id = request.user.id
    LastPlaySong=LastPlay.objects.filter(last_play_song_user=user_id)
    return render(request, 'HeartBeat/About.html',{"LastPlaySong":LastPlaySong})


@login_required(login_url="/Login/")
def ArtistSongs(request):
    user_id = request.user.id
    Artist_Id = request.GET.get('Artist')
    Artists=Artist.objects.filter(id=Artist_Id)
    Musics=Songs.objects.filter(artist=Artist_Id)
    LastPlaySong=LastPlay.objects.filter(last_play_song_user=user_id)
    return render(request, 'HeartBeat/Artist.html',{"Artists":Artists,"Musics":Musics,"LastPlaySong":LastPlaySong})


@login_required(login_url="/Login/")
def Profile(request):
    user_id = request.user.id
    user= User.objects.filter(id=user_id)
    Favourites_song_id= []
    Musics=[]
    for item in Favourites.objects.filter(user=user_id):
        a= item.songs.id
        Favourites_song_id.append(a)
    for item in Favourites_song_id:
        for i in Songs.objects.filter(id=item):
            if i not in Musics:
                Musics.append(i)
    LastPlaySong=LastPlay.objects.filter(last_play_song_user=user_id)
    return render(request, 'Account/Profile.html',{"Musics":Musics,"LastPlaySong":LastPlaySong,"user":user})