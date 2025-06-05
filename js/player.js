let currentSong = 1;
const totalSongs = 3;  // UPDATE THIS VALUE to match your songs count

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
  currentSong = currentSong < totalSongs ? currentSong + 1 : 1;
  loadSong();
  audio.play();
}

function prevSong() {
  currentSong = currentSong > 1 ? currentSong - 1 : totalSongs;
  loadSong();
  audio.play();
}

audio.addEventListener('ended', nextSong);
loadSong();
