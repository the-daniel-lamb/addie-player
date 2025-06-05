let currentSong = 1;
const totalSongs = 12;  // UPDATE THIS NUMBER TO MATCH YOUR SONG COUNT

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
  if (currentSong < totalSongs) {
    currentSong++;
  } else {
    currentSong = 1; // Loop back to first song
  }
  loadSong();
  audio.play();
}

function prevSong() {
  if (currentSong > 1) {
    currentSong--;
  } else {
    currentSong = totalSongs; // Go to last song
  }
  loadSong();
  audio.play();
}

audio.addEventListener('ended', nextSong);
loadSong();
