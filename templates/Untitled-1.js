
    <script>
        let previous = document.querySelector('#pre');
let play = document.querySelector('#play');
let next = document.querySelector('#next');
let title = document.querySelector('#title');
let recent_volume= document.querySelector('#volume');
let volume_show = document.querySelector('#volume_show');
let slider = document.querySelector('#duration_slider');
let show_duration = document.querySelector('#show_duration');
let track_image = document.querySelector('#track_image');
let auto_play = document.querySelector('#auto');
let present = document.querySelector('#present');
let total = document.querySelector('#total');
let artist = document.querySelector('#artist');



let timer;
let autoplay = 0;

let index_no = 0;
let Playing_song = false;

//create a audio Element
let track = document.createElement('audio');


//All songs list
let All_song = [
   {
     name: "first song",
     path: "{% static 'Audio/1.mp3' %}",
     img: "img/img1.jpg",
     singer: "1"
   },
   {
     name: "second song",
     path: "{% static 'Audio/2.mp3' %}",
     img: "img/img2.jpg",
     singer: "2"
   },
   {
     name: "third song",
     path: "{% static 'Audio/3.mp3' %}",
     img: "img/img3.jpg",
     singer: "3"
   },
   {
     name: "fourth song",
     path: "{% static 'Audio/4.mp3' %}",
     img: "img/img4.jpg",
     singer: "4"
   },
   {
     name: "fifth song",
     path: "{% static 'Audio/1.mp3' %}",
     img: "img/img5.jpg",
     singer: "5"
   }
];


// All functions


// function load the track
function load_track(index_no){
	clearInterval(timer);
	reset_slider();

	track.src = All_song[index_no].path;
	title.innerHTML = All_song[index_no].name;	
	track_image.src = All_song[index_no].img;
    artist.innerHTML = All_song[index_no].singer;
    track.load();

	timer = setInterval(range_slider ,1000);
	total.innerHTML = All_song.length;
	present.innerHTML = index_no + 1;
}

load_track(index_no);


//mute sound function
function mute_sound(){
	track.volume = 0;
	volume.value = 0;
	volume_show.innerHTML = 0;
}


// checking.. the song is playing or not
 function justplay(){
 	if(Playing_song==false){
 		playsong();

 	}else{
 		pausesong();
 	}
 }


// reset song slider
 function reset_slider(){
 	slider.value = 0;
 }

// play song
function playsong(){
  track.play();
  Playing_song = true;
  play.innerHTML = '<i class="fa fa-pause" aria-hidden="true"></i>';
}

//pause song
function pausesong(){
	track.pause();
	Playing_song = false;
	play.innerHTML = '<i class="fa fa-play" aria-hidden="true"></i>';
}


// next song
function next_song(){
	if(index_no < All_song.length - 1){
		index_no += 1;
		load_track(index_no);
		playsong();
        
	}else{
		index_no = 0;
		load_track(index_no);
		playsong();

	}
}


// previous song
function previous_song(){
	if(index_no > 0){
		index_no -= 1;
		load_track(index_no);
		playsong();

	}else{
		index_no = All_song.length;
		load_track(index_no);
		playsong();
	}
}


// change volume
function volume_change(){
	volume_show.innerHTML = recent_volume.value;
	track.volume = recent_volume.value / 100;
}

// change slider position 
function change_duration(){
	slider_position = track.duration * (slider.value / 100);
	track.currentTime = slider_position;
}

// autoplay function
function autoplay_switch(){
	if (autoplay==1){
       autoplay = 0;
       auto_play.style.background = "rgba(255,255,255,0.2)";
	}else{
       autoplay = 1;
       auto_play.style.background = "#FF8A65";
	}
}


function range_slider(){
	let position = 0;
        
        // update slider position
		if(!isNaN(track.duration)){
		   position = track.currentTime * (100 / track.duration);
		   slider.value =  position;
	      }

       
       // function will run when the song is over
       if(track.ended){
       	 play.innerHTML = '<i class="fa fa-play" aria-hidden="true"></i>';
           if(autoplay==1){
		       index_no += 1;
		       load_track(index_no);
		       playsong();
           }
	    }
     }
    </script>

let myProgressBar = document.getElementById('myProgressBar');
audioElement.addEventListener('timeupdate', ()=>{ 
    // Update Seekbar
    progress = parseInt((audioElement.currentTime/audioElement.duration)* 100); 
    myProgressBar.value = progress;
})

myProgressBar.addEventListener('change', ()=>{
    audioElement.currentTime = myProgressBar.value * audioElement.duration/100;
})










<script>
// Select all the elements in the HTML page
// and assign them to a variable
// let now_playing = document.querySelector(".now-playing");
let track_art = document.querySelector(".track-art");
let track_name = document.querySelector(".track-name");
let track_artist = document.querySelector(".track-artist");

let playpause_btn = document.querySelector(".playpause-track");
let next_btn = document.querySelector(".next-track");
let prev_btn = document.querySelector(".prev-track");

let seek_slider = document.querySelector(".seek_slider");
let volume_slider = document.querySelector(".volume_slider");
let curr_time = document.querySelector(".current-time");
let total_duration = document.querySelector(".total-duration");

let playpause_btn1 = document.querySelector(".ListSongPlayBtn1");
let song_id =''


// Specify globally used values
let track_index = 0;
let isPlaying = false;
let updateTimer;

// Create the audio element for the player
let curr_track = document.createElement("audio");

// Define the list of tracks that have to be played
let track_list = [
{% for music in LastPlaySong %}{
	name: "{{music.last_play_song.song_name}}",
	artist: "{{music.last_play_song.artist.artist_name}}",
	image: "{{music.last_play_song.song_image}}",
	path: "{{music.last_play_song.song_file.url}}",
	song_id: "{{music.last_play_song.id}}",
  },
  {% endfor %}
];

function play(id) {

  clearInterval(updateTimer);
  resetValues();
  song_id =id
  curr_track.src=document.getElementById("MusicSrc"+song_id).getAttribute('src');
  curr_track.load();
  playpauseTrack()
  track_art.style.backgroundImage ="url(" + document.getElementById("MusicImg"+song_id).getAttribute('src'); + ")";
  track_name.textContent = document.getElementById("MusicName"+song_id).innerHTML;
  track_artist.textContent = document.getElementById("MusicArtist"+song_id).innerHTML;

  updateTimer = setInterval(seekUpdate, 1000);
  curr_track.addEventListener("ended", nextTrack);
}

  {/* clearInterval(updateTimer);
  resetValues();

  song_id =track_list[track_index].song_id;
  curr_track.src=track_list[track_index].path;
  curr_track.load();

  track_art.style.backgroundImage =
	"url(" + track_list[track_index].image + ")";
  track_name.textContent = track_list[track_index].name;
  track_artist.textContent = track_list[track_index].artist;

  updateTimer = setInterval(seekUpdate, 1000);
  curr_track.addEventListener("ended", nextTrack); */}



function random_bg_color() {
  // Get a random number between 64 to 256
  // (for getting lighter colors)
  let red = Math.floor(Math.random() * 256) + 64;
  let green = Math.floor(Math.random() * 256) + 64;
  let blue = Math.floor(Math.random() * 256) + 64;

  // Construct a color withe the given values
  let bgColor = "rgb(" + red + ", " + green + ", " + blue + ")";

  // Set the background to the new color
  document.body.style.background = bgColor;
}

// Function to reset all values to their default
function resetValues() {
  curr_time.textContent = "00:00";
  total_duration.textContent = "00:00";
  seek_slider.value = 0;
}

function playpauseTrack() {
  // Switch between playing and pausing
  // depending on the current state
  if (!isPlaying) playTrack();
  else pauseTrack();
}

function playTrack() {
  // Play the loaded track
  curr_track.play();
  isPlaying = true;
  // Replace icon with the pause icon
  document.getElementById("PlaySong"+song_id).innerHTML= '<i class="fa fa-pause-circle"></i>';
  playpause_btn.innerHTML = '<i class="fa fa-pause-circle fa-3x"></i>';
}

function pauseTrack() {
  // Pause the loaded track
  curr_track.pause();
  isPlaying = false;

  document.getElementById("PlaySong"+song_id).innerHTML= '<i class="fa fa-play-circle"></i>';
  // Replace icon with the play icon
  playpause_btn.innerHTML = '<i class="fa fa-play-circle fa-3x"></i>';
}

function nextTrack() {
  // Go back to the first track if the
  // current one is the last in the track list
  song_id=parseInt(song_id)+1;

  // Load and play the new track
  play(song_id);
  playTrack();
}

function prevTrack() {
  // Go back to the last track if the
  // current one is the first in the track list
  if (song_id > 0){
	song_id= parseInt(song_id) - 1;
  }
  else {
	song_id;
  }

  // Load and play the new track
  play(song_id);
  playTrack();
}

function seekTo() {
  // Calculate the seek position by the
  // percentage of the seek slider
  // and get the relative duration to the track
  seekto = curr_track.duration * (seek_slider.value / 100);

  // Set the current track position to the calculated seek position
  curr_track.currentTime = seekto;
}

function setVolume() {
  // Set the volume according to the
  // percentage of the volume slider set
  curr_track.volume = volume_slider.value / 100;
}

function seekUpdate() {
  let seekPosition = 0;

  // Check if the current track duration is a legible number
  if (!isNaN(curr_track.duration)) {
	seekPosition = curr_track.currentTime * (100 / curr_track.duration);
	seek_slider.value = seekPosition;

	// Calculate the time left and the total duration
	let currentMinutes = Math.floor(curr_track.currentTime / 60);
	let currentSeconds = Math.floor(
	  curr_track.currentTime - currentMinutes * 60
	);
	let durationMinutes = Math.floor(curr_track.duration / 60);
	let durationSeconds = Math.floor(
	  curr_track.duration - durationMinutes * 60
	);

	// Add a zero to the single digit time values
	if (currentSeconds < 10) {
	  currentSeconds = "0" + currentSeconds;
	}
	if (durationSeconds < 10) {
	  durationSeconds = "0" + durationSeconds;
	}
	if (currentMinutes < 10) {
	  currentMinutes = "0" + currentMinutes;
	}
	if (durationMinutes < 10) {
	  durationMinutes = "0" + durationMinutes;
	}

	// Display the updated duration
	curr_time.textContent = currentMinutes + ":" + currentSeconds;
	total_duration.textContent = durationMinutes + ":" + durationSeconds;
  }
}

// Load the first track in the tracklist
play(song_id);
</script>