const music = document.getElementById("bg-music");
const musicBtn = document.getElementById("music-btn");
const prevMusicBtn = document.getElementById("prev-music-btn");
const nextMusicBtn = document.getElementById("next-music-btn");

const musicList = [
  {
    name: "Track 1",
    src: "https://raw.githubusercontent.com/Doldie/Mybio/main/music.mp3"
  },
  {
    name: "Track 2",
    src: "https://github.com/Doudks/test/raw/refs/heads/main/Workingsongs/AGAIN.mp3"
  },
  {
    name: "Track 3",
    src: "https://github.com/Doudks/test/raw/refs/heads/main/Workingsongs/As%20the%20world%20caves%20in.mp3"
  },
  {
    name:"Track 4",
    src:"https://github.com/Doudks/test/raw/refs/heads/main/Workingsongs/Come%20home.mp3"
  },
  {
    name:"Track 5",
    src:"https://github.com/Doudks/test/raw/refs/heads/main/Workingsongs/Conan%20Gray%20Yours.mp3"
  },
  {
    name:"Track 6",
    src:"https://github.com/Doudks/test/raw/refs/heads/main/Workingsongs/Covet.mp3"
  },
  {
    name:"Track 7",
    src:"https://github.com/Doudks/test/raw/refs/heads/main/Workingsongs/Exit%20music.mp3"
  },
  {
    name:"Track 8",
    src:"https://github.com/Doudks/test/raw/refs/heads/main/Workingsongs/Give%20me%20More.mp3"
  },
  {
    name:"Track 9",
    src:"https://github.com/Doudks/test/raw/refs/heads/main/Workingsongs/Heaven%20can%20wait.mp3"
  },
  {
    name:"Track 10",
    src:"https://github.com/Doudks/test/raw/refs/heads/main/Workingsongs/How%20id%20kill.mp3"
  },
  {
    name:"Track 11",
    src:"https://github.com/Doudks/test/raw/refs/heads/main/Workingsongs/I%20love%20you,%20love%20you%20too.mp3"
  },
  {
    name:"Track 12",
    src:"https://github.com/Doudks/test/raw/refs/heads/main/Workingsongs/Like%20him.mp3"
  },
  {
    name:"Track 13",
    src:"https://github.com/Doudks/test/raw/refs/heads/main/Workingsongs/MAGIC.mp3"
  },
  {
    name:"Track 14",
    src:"https://github.com/Doudks/test/raw/refs/heads/main/Workingsongs/Melanie%20Martinez%20Crybaby.mp3"
  },
  {
    name:"Track 15",
    src:"https://github.com/Doudks/test/raw/refs/heads/main/Workingsongs/Mitski%20-%20My%20Love%20Mine%20All%20Mine%20(Official%20Lyric%20Video).mp3"
  },
  {
    name:"Track 16",
    src:"https://github.com/Doudks/test/raw/refs/heads/main/Workingsongs/Time%20in%20a%20Bottle.mp3"
  },
  {
    name:"Track 17",
    src:"https://github.com/Doudks/test/raw/refs/heads/main/Workingsongs/snowman.mp3"
  }
  
];

const preloadedTracks = [];

musicList.forEach(track => {
  const audio = new Audio();
  audio.preload = "auto";
  audio.src = track.src;
  preloadedTracks.push(audio);
});

let currentMusicIndex = 0;

if (music && musicBtn && prevMusicBtn && nextMusicBtn) {
  music.volume = 0.16;

  function updateMusicButton() {
    if (music.paused) {
      musicBtn.textContent = "play";
      musicBtn.classList.remove("playing");
    } else {
      musicBtn.textContent = musicList[currentMusicIndex].name;
      musicBtn.classList.add("playing");
    }
  }

      function loadMusic(index) {
      currentMusicIndex = index;
      music.src = musicList[currentMusicIndex].src;
      updateMusicButton();
    }

  async function playCurrentMusic() {
    try {
      await music.play();
      updateMusicButton();
    } catch (err) {
      console.error("Erro ao tocar música:", err);
    }
  }

  function pauseCurrentMusic() {
    music.pause();
    updateMusicButton();
  }

  musicBtn.addEventListener("click", async () => {
    if (music.paused) {
      await playCurrentMusic();
    } else {
      pauseCurrentMusic();
    }
  });

  prevMusicBtn.addEventListener("click", async () => {
    const wasPlaying = !music.paused;

    currentMusicIndex =
      (currentMusicIndex - 1 + musicList.length) % musicList.length;

    loadMusic(currentMusicIndex);

    if (wasPlaying) {
      await playCurrentMusic();
    }
  });

  nextMusicBtn.addEventListener("click", async () => {
    const wasPlaying = !music.paused;

    currentMusicIndex =
      (currentMusicIndex + 1) % musicList.length;

    loadMusic(currentMusicIndex);

    if (wasPlaying) {
      await playCurrentMusic();
    }
  });

  music.addEventListener("ended", async () => {
    currentMusicIndex =
      (currentMusicIndex + 1) % musicList.length;

    loadMusic(currentMusicIndex);
    await playCurrentMusic();
  });

  loadMusic(currentMusicIndex);
}
