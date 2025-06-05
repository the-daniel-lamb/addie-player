let currentSong = 1;
let totalSongs = 0;
let trackList = [];

// DOM references
const audio = document.getElementById('audio');
const title = document.getElementById('song-title');
const lyricsDiv = document.getElementById('lyrics');

// Load tracklist from tracks.txt if exists
function loadTrackList() {
  fetch('tracks.txt')
    .then(res => res.text())
    .then(data => {
      trackList = data.split(/\r?\n/).filter(line => line.trim() !== '');
      totalSongs = trackList.length;
      loadSong();
    })
    .catch(err => {
      console.warn("No tracks.txt found, fallback to default");
      totalSongs = 12; // fallback number
      loadSong();
    });
}

// Load specific song
function loadSong() {
  const songName = `${currentSong}.m4a`;
  const lyricsName = `${currentSong}.txt`;

  fetch(`lyrics/${lyricsName}`)
    .then(res => res.text())
    .then(data => {
      const lines = data.split(/\r?\n/);
      const firstLine = lines[0].trim();

      let songTitle = '';

      if (firstLine.toUpperCase().startsWith('TITLE:')) {
        songTitle = firstLine.substring(6).trim();
        lyricsDiv.textContent = lines.slice(1).join('\n').trim();
      } else if (trackList.length >= currentSong) {
        songTitle = trackList[currentSong - 1];
        lyricsDiv.textContent = data;
      } else {
        songTitle = `Song ${currentSong}`;
        lyricsDiv.textContent = data;
      }

      title.textContent = `${currentSong}. ${songTitle}`;
    })
    .catch(err => {
      let fallbackTitle = trackList.length >= currentSong ? trackList[currentSong - 1] : `Song ${currentSong}`;
      title.textContent = `${currentSong}. ${fallbackTitle}`;
      lyricsDiv.textContent = "No lyrics available.";
    });

  audio.src = `songs/${songName}`;
}

function playPause() {
  if (audio.paused) {
    audio.play();
    gtag('event', 'play', {
      'event_category': 'Audio Player',
      'event_label': `Song ${currentSong}`
    });
  } else {
    audio.pause();
    gtag('event', 'pause', {
      'event_category': 'Audio Player',
      'event_label': `Song ${currentSong}`
    });
  }
}

function nextSong() {
  currentSong = currentSong < totalSongs ? currentSong + 1 : 1;
  loadSong();
  audio.play();
  gtag('event', 'next_song', {
    'event_category': 'Audio Player',
    'event_label': `Song ${currentSong}`
  });
}

function prevSong() {
  currentSong = currentSong > 1 ? currentSong - 1 : totalSongs;
  loadSong();
  audio.play();
  gtag('event', 'prev_song', {
    'event_category': 'Audio Player',
    'event_label': `Song ${currentSong}`
  });
}

audio.addEventListener('ended', nextSong);

// Initialize
loadTrackList();
