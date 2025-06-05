let currentSong = 1;
let totalSongs = 3; // you can update manually or automate

const audio = document.getElementById('audio');
const title = document.getElementById('song-title');
const lyricsDiv = document.getElementById('lyrics');

function loadSong() {
  const songName = `${currentSong}.m4a`;
  const lyricsName = `${currentSong}.txt`;

  title.textContent = `Song ${currentSong}`;
  audio.src = `songs/${songName}`;

  fetch(`lyrics/${lyricsName}`)
    .then(res => res.text())
    .then(data => lyricsDiv.textContent = data)
    .catch(err => lyricsDiv.textContent = "No lyrics available");
}

function playPause() {
  if (audio.paused) {
    audio.play();
  } else {
    audio.pause();
  }
}

function nextSong() {
  if (currentSong < totalSongs) {
    currentSong++;
    loadSong();
    audio.play();
  }
}

function prevSong() {
  if (currentSong > 1) {
    currentSong--;
    loadSong();
    audio.play();
  }
}

audio.addEventListener('ended', nextSong);

loadSong();
