let currentSong = 1;
let totalSongs = 12;
let trackTitles = [];

const audio = document.getElementById('audio');
const title = document.getElementById('song-title');
const lyricsDiv = document.getElementById('lyrics');

function loadTracks() {
  fetch('tracks.txt')
    .then(res => res.text())
    .then(data => {
      trackTitles = data.trim().split('\n').map(line => line.trim());
      totalSongs = trackTitles.length;
      loadSong();
    })
    .catch(err => {
      alert("Failed to load tracklist.");
      console.error(err);
    });
}

function loadSong() {
  const songName = `${currentSong}.m4a`;
  const lyricsName = `${currentSong}.txt`;

  title.textContent = `${currentSong}. ${trackTitles[currentSong - 1]}`;
  audio.src = `songs/${songName}`;

  fetch(`lyrics/${lyricsName}`)
    .then(res => res.text())
    .then(data => lyricsDiv.textContent = data)
    .catch(err => lyricsDiv.textContent = "No lyrics available.");
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
  } else {
    currentSong = 1;
  }
  loadSong();
  audio.play();
}

function prevSong() {
  if (currentSong > 1) {
    currentSong--;
  } else {
    currentSong = totalSongs;
  }
  loadSong();
  audio.play();
}

audio.addEventListener('ended', nextSong);

// Initialize:
loadTracks();
