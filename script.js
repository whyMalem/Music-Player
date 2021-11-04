const playlist = [
  {
    id: 1,
    songName: "PillowTalk",
    artistName: "Zayn Malik",
  },
  {
    id: 2,
    songName: "Galway Girl",
    artistName: "Ed Sheeran",
  },
  {
    id: 3,
    songName: "There's Nothing Holdin' Me Back",
    artistName: "Shawn Mendes",
  },
];

const pause = document.querySelector(".pause");
const audio = document.querySelector("audio");
const prev = document.querySelector(".prev");
const next = document.querySelector(".next");
const song_name = document.querySelector(".song_name");
const artist = document.querySelector(".artist");
const song_image = document.querySelector(".song_image");
const current_time = document.querySelector(".current_time");
const song_duration = document.querySelector(".song_duration");
const progress = document.querySelector(".progress");
const progress_bar = document.querySelector(".progress_bar");
const overflow = document.querySelector(".overflow");
const loop = document.querySelector(".loop");
const playlistBtn = document.querySelector(".playlist");
const song_playlist = document.querySelector(".song_playlist");
const dropdown = document.querySelector(".dropdown");
const song_card = document.querySelectorAll(".song_card");

let play = false;
const playMusic = () => {
  play = true;
  audio.play();
  pause.classList.replace("fa-play", "fa-pause");
  song_image.classList.add("rotate");
  // pause.attributes.setNamedItem(title)
  pause.setAttribute("title", "Pause");
};

const pauseMusic = () => {
  play = false;
  audio.pause();
  pause.classList.replace("fa-pause", "fa-play");
  song_image.classList.remove("rotate");
  pause.setAttribute("title", "Play");
};

const loadSong = (currSong) => {
  song_name.textContent = `${currSong.songName}`;
  artist.textContent = `${currSong.artistName}`;
  song_image.setAttribute("src", `./images/${currSong.artistName}.jpg`);
  audio.setAttribute("src", `./audio/${currSong.songName}.mp3`);
  // console.log(audio);
};

// when we clicked on the song card
let index = 0;

song_card.forEach((card, ind) => {
  card.addEventListener("click", (e) => {
    index = playlist[ind].id;
    loadSong(playlist[ind]);
    playMusic();
  });
});

const prevSong = () => {
  // this is normally how prev function will do
  index--;
  if (index < 0) {
    loadSong(playlist[playlist.length - 1]);
    playMusic();
  } else {
    loadSong(playlist[index]);
    playMusic();
  }
};

const nextSong = () => {
  index++;
  if (index >= 3) {
    index = 0;
    loadSong(playlist[index]);
    playMusic();
  } else {
    loadSong(playlist[index]);
    playMusic();
  }
};

// for progress bar and song duration

//  here we get to know current music playing
audio.addEventListener("playing", (e) => {
  // checking the overflow
  if (song_name.offsetHeight > overflow.offsetHeight) {
    song_name.innerHTML = `<marquee direction="left" class="song_name">${song_name.textContent}</marquee>`;
  }

  let currentSong = audio.src;
  song_card.forEach((card) => {
    if (currentSong == card.getElementsByTagName("audio")[0].src) {
      card.classList.add("playing");
    } else {
      card.classList.remove("playing");
    }
  });
});

audio.addEventListener("timeupdate", (e) => {
  let { currentTime, duration } = e.srcElement;

  // Progress Bar
  let progressTime = (currentTime / duration) * 100;
  progress.style.width = `${progressTime}%`;
  // let min_duration, sec_duration;

  // Song Duration
  if (duration) {
    let min_duration = Math.floor(duration / 60);
    let sec_duration = Math.floor(duration % 60);
    if (min_duration < 10) {
      min_duration = `0${min_duration}`;
    }
    if (sec_duration < 10) {
      sec_duration = `0${sec_duration}`;
    }
    song_duration.textContent = `${min_duration} : ${sec_duration}`;
  }

  // Current Duration
  let min_currentTime = Math.floor(currentTime / 60);
  let sec_currentTime = Math.floor(currentTime % 60);
  if (min_currentTime < 10) {
    min_currentTime = `0${min_currentTime}`;
  }
  if (sec_currentTime < 10) {
    sec_currentTime = `0${sec_currentTime}`;
  }
  current_time.textContent = `${min_currentTime} : ${sec_currentTime}`;
});

//for skipping music
progress_bar.addEventListener("click", (e) => {
  // console.log(e);
  const { duration } = audio;
  let progress_move = (e.offsetX / e.srcElement.clientWidth) * duration;
  audio.currentTime = progress_move;
  // progress.style.width = progress_move
  // console.log(progress_move);
});

// for loop the music
let isLoop = false;
let loopOn = () => {
  isLoop = true;
  audio.setAttribute("loop", "loop");
  loop.setAttribute("title", "Loop Off");
  loop.style.color = "#000";
};

let loopOff = () => {
  isLoop = false;
  audio.removeAttribute("loop", "loop");
  loop.setAttribute("title", "Loop On");
  loop.style.color = " rgba(0, 0, 0, 0.4)";
};
loop.addEventListener("click", () => {
  isLoop ? loopOff() : loopOn();
});

// to show playlist
playlistBtn.addEventListener("click", (e) => {
  song_playlist.classList.add("show");
});

// to remove playlist
dropdown.addEventListener("click", () => {
  song_playlist.classList.remove("show");
});

audio.addEventListener("ended", nextSong);
pause.addEventListener("click", () => {
  play ? pauseMusic() : playMusic();
});
next.addEventListener("click", nextSong);
prev.addEventListener("click", prevSong);
