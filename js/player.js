let currentSong = 1;
const totalSongs = 12;  // ⚠️ Update for your number of songs

const audio = document.getElementById('audio');
const title = document.getElementById('song-title');
const lyricsDiv = document.getElementById('lyrics');

function loadSong() {
  const songName = `${currentSong}.m4a`;
  const lyricsName = `${currentSong}.txt`;

  // 💡 FIXED HERE: fetch real song name
  fetch(`lyrics/${lyricsName}`)
    .then(res => res.text())
    .then(data => {
      const lines = data.split('\n');
      const firstLine = lines[0].trim();
      if (firstLine.startsWith('TITLE:')) {
        title.textContent = firstLine.replace('TITLE:', '').trim();
        lyricsDiv.textContent = lines.slice(1).join('\n').trim();
      } else {
        title.textContent = `Song ${currentSong}`;
        lyricsDiv.textContent = data;
      }
    })
    .catch(err => {
      title.textContent = `Song ${currentSong}`;
      lyricsDiv.textContent = "No lyrics available.";
    });

  audio.src = `songs/${songName}`;
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
