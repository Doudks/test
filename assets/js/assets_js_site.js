// assets/js/site.js
// Tudo o que estava inline no HTML foi movido para cá.
// Não há uso de eval / new Function / handlers inline.
// Uso exclusivo de addEventListener e execução compatível com CSP 'self'.


function initFriends() {
  const mini = document.getElementById("mini-profile");
  const miniAvatar = document.getElementById("mini-avatar");
  const miniName = document.getElementById("mini-name");
  const miniDesc = document.getElementById("mini-desc");

  if (!mini || !miniAvatar || !miniName || !miniDesc) return;

  let hideTimeout = null;
  let activeCard = null;

  document.querySelectorAll(".friend-card").forEach(card => {
    const id = card.dataset.id;

    const show = (x, y) => {
      if (hideTimeout) clearTimeout(hideTimeout);
      activeCard = card;

      const data = friendsData[id] || {};
      miniAvatar.src = data.avatar || "https://cdn.discordapp.com/embed/avatars/5.png";
      miniName.textContent = data.name || card.textContent.trim();
      miniDesc.textContent = data.desc || "Friend";

      mini.classList.remove("hidden");
      mini.classList.add("show");

      const padding = 12;
      const rect = mini.getBoundingClientRect();

      let left = x + 15;
      let top = y + 15;

      if (left + rect.width > window.innerWidth - padding)
        left = x - rect.width - 15;

      if (top + rect.height > window.innerHeight - padding)
        top = y - rect.height - 15;

      mini.style.left = Math.max(padding, left) + "px";
      mini.style.top = Math.max(padding, top) + "px";
    };

    const hide = () => {
      hideTimeout = setTimeout(() => {
        mini.classList.remove("show");
        mini.classList.add("hidden");
        activeCard = null;
      }, 50);
    };

    // desktop
    card.addEventListener("mouseenter", e => show(e.clientX, e.clientY));
    card.addEventListener("mousemove", e => {
      if (activeCard === card) show(e.clientX, e.clientY);
    });
    card.addEventListener("mouseleave", hide);

    // mobile
    card.addEventListener("touchstart", e => {
      const t = e.touches[0];
      show(t.clientX, t.clientY);
    });

    card.addEventListener("touchend", hide);
  });
}

(function () {
  'use strict';

  // --- Configurações / seletores ---
  const LOADING_EXIT_DELAY = 8000; // ms (igual ao original)
  const decorationUrl =
    "https://cdn.discordapp.com/avatar-decoration-presets/a_be111e4303d634c55500202a61656e0b.png?size=512";
  const factsPool = [
    "I have two cats that chill with me while I game.", "My favorite anime is Yofukashi no Uta.",
    "I can name almost every Mirage 2000 variant.", "I track crazy car 0-400 km/h times for fun.",
    "War Thunder is life", "I’m obsessed with cars like the Rimac Nevera R and Koenigsegg Jesko.",
    "I enjoy drawing characters late at night.", "I can spend hours comparing aircraft designs just for fun.",
    "My fav color is Rose red", "The Challenger 2 British MBT is my fav tank",
    "I’m obsessed with jet engine sounds.", "I draw better at 2 AM than during the day.",
    "I once played War Thunder for 12 hours straight.", "I can identify fighter jets just by silhouette.",
    "My fav song is 911 by Ellise", "My fav artist is Melanie Martinez", "My fav food is savory pie",
    "Cheetahs are my fav animal", "I have more than 3000 hours of Sol's RNG", "France is my fav nation",
    "Tomboys over femboys", "1+1 = 2", "Loona? perfection", "🥀", "Amd > Intel", "Reshiram best pokemon",
    "Cats > dogs", "I'm lazy asf 💔", "V8 > V12", "Lamborghini Murcielago best sounding car ever made",
    "Unpopular opinion, Sousou no Frieren is Mid", "Monster energy is great", "Kiwi my fav fruit",
    "Wannabe extrovert", "Yaps a lot about things i'm obsessed with", "Passionfruit the best to make juice with",
    "I like to argue about something irrelevant all day"
  ];

  // --- Helpers ---
  function toggleSectionById(id) {
    const section = document.getElementById(id);
    if (!section) return;
    const isOpen = section.classList.contains('open');

    // keep the original logic and timing
    section.style.transition = 'none';
    if (isOpen) {
      if (section.style.maxHeight === '' || section.style.maxHeight === 'none') {
        section.style.maxHeight = section.scrollHeight + 'px';
      }
      // force reflow
      void section.offsetHeight;
      section.style.transition = 'max-height 0.35s ease, opacity 0.35s ease';
      section.style.maxHeight = '0px';
      section.classList.remove('open');
    } else {
      section.style.maxHeight = '0px';
      void section.offsetHeight;
      section.style.transition = 'max-height 0.35s ease, opacity 0.35s ease';
      section.classList.add('open');
      section.style.maxHeight = section.scrollHeight + 'px';
    }

    const onEnd = (e) => {
      if (e.propertyName !== 'max-height') return;
      if (section.classList.contains('open')) {
        section.style.transition = 'none';
        section.style.maxHeight = 'none';
      }
      section.removeEventListener('transitionend', onEnd);
    };
    section.addEventListener('transitionend', onEnd);
  }

  function shuffleFactsAction(btnElement) {
    if (btnElement) {
      btnElement.style.transform = "scale(0.9)";
      setTimeout(() => { btnElement.style.transform = "scale(1)"; }, 120);
    }
    const container = document.getElementById('funFactsContainer');
    if (!container) return;
    // reproduce original selection behavior
    const shuffled = factsPool.slice().sort(() => 0.5 - Math.random()).slice(0, 4);
    container.innerHTML = '';
    shuffled.forEach(fact => {
      const div = document.createElement('div');
      div.className = 'fact';
      div.textContent = fact;
      container.appendChild(div);
    });
  }

  // --- DOM initialization and event wiring ---
  function initToggleButtons() {
    // buttons now use data-target attribute
    const toggleButtons = document.querySelectorAll('.toggle-btn[data-target]');
    toggleButtons.forEach(btn => {
      btn.addEventListener('click', function () {
        const target = this.getAttribute('data-target');
        if (target) toggleSectionById(target);
      }, { passive: true });
    });
  }

  function initShuffleButton() {
    // there are two buttons that share class "shuffle-btn": one is the actual shuffle, other is the music button.
    // We select the specific one that was the shuffle facts button via data-action
    const btn = document.querySelector('.shuffle-btn[data-action="shuffle-facts"]');
    if (btn) {
      btn.addEventListener('click', function () {
        shuffleFactsAction(this);
      });
    }
  }

  function initMusicButton() {
    const music = document.getElementById("bg-music");
    const btn = document.getElementById("music-btn");
    if (!music || !btn) return;

    // preserve original volume and behavior
    music.volume = 0.16;

    btn.addEventListener('click', function () {
      if (music.paused) {
        try {
          music.currentTime = 0;
        } catch (e) {
          // some browsers may throw if not allowed; ignore to preserve UX
        }
        music.muted = false;
        const playPromise = music.play();
        // handle browsers returning a promise (no inline handlers used)
        if (playPromise && typeof playPromise.then === 'function') {
          playPromise.then(() => {
            btn.textContent = "Playing";
            btn.classList.add("playing");
          }).catch(() => {
            // autoplay/play might be blocked — still change state if allowed later
            btn.textContent = "Playing";
            btn.classList.add("playing");
          });
        } else {
          btn.textContent = "Playing";
          btn.classList.add("playing");
        }
      } else {
        music.pause();
        btn.textContent = "Sound";
        btn.classList.remove("playing");
      }
    });
  }

  function initLoadingScreenBehaviour() {
    // run when the whole page loads (resources included) to match original
    window.addEventListener('load', function () {
      setTimeout(() => {
        const ls = document.getElementById('loading-screen');
        if (ls) ls.classList.add('exit');
        document.body.classList.remove('loading');
      }, LOADING_EXIT_DELAY);
    }, { once: true });
  }

  function initAvatarDecoration() {
    const deco = document.getElementById("avatar-decoration");
    if (!deco) return;
    deco.src = decorationUrl;
    deco.style.display = "block";
    deco.onerror = function () {
      // keep same behavior as original
      deco.style.display = "none";
    };
  }

  function initBgParallax() {
    const bg = document.getElementById("bg-parallax");
    if (!bg) return;
    window.addEventListener('scroll', function () {
      const offset = window.scrollY * 0.025;
      bg.style.backgroundPosition = `50% calc(50% + ${offset}px)`;
    }, { passive: true });
  }

  // --- Kick off initialization at DOMContentLoaded ---
  document.addEventListener('DOMContentLoaded', function () {
    initToggleButtons();
    initShuffleButton();
    initMusicButton();
    initAvatarDecoration();
    initBgParallax();
    initFriends();
    // loading screen uses window.load to match original timing/semantics
    initLoadingScreenBehaviour();
  });

})();

const friendsData = {
  clear: {
    name: "Clear",
    avatar: "https://i.imgur.com/JnjU9hO.png",
    desc: "An 18y Brazilian, better known as Clear, or as Charthool by some people. I like to see the people they love happy and sometimes takes things too seriously.",
    status: "online"
  },

  thedragonplayer: {
    name: "thedragonplayer",
    avatar: "https://i.imgur.com/1YJoXTY.jpeg",
    desc: "The Dragon Galaxy, Dragon894, The Dragon Player! Enfim, me chame de Dragon. Gosto de jogos de rpg, estratégia, ação e puzzle (alguns). Minha música favorita é sky full of stars de coldplay. Gosto de ver artes fofas como furries e kemonomimis. Franquia favorita: Assassins Creed",
    status: "dnd"
  },

  Drakkoo: {
    name: "Drakkoo",
    avatar: "https://i.imgur.com/gJBo5It.png",
    desc: "Pessoa mais reservada e direta, mas que se empolga fácil falando do que gosta. Nascido em Natal/RN 🇧🇷 (Cidade do Sol), valorizo respeito, boas conversas e pequenos gestos.",
    status: "dnd"
  },

  Fakezalem: {
    name: "Fakezalem",
    avatar: "https://i.imgur.com/V7MMQWb.png",
    desc: "💍STARC0LLECT0R 💙 💫 Universum totum duobus tantum numeris servare possumus... SAPERE AUDE!!!",
    status: "dnd"
  },

  matheusbleck21: {
    name: "matheusbleck21",
    avatar: "https://i.imgur.com/BxjILM7.png",
    desc: "as vozes não param",
    status: "dnd"
  },

  Nikko: {
    name: "Nikko",
    avatar: "https://i.imgur.com/AAhjYkX.png",
    desc: "Gosto de conversar sobre assuntos militares e de guerra em geral. Aposentado do war thunder.",
    status: "dnd"
  },

  nitidez: {
    name: "nitidez",
    avatar: "https://i.imgur.com/sdQOetg.jpeg",
    desc: "Sigma, propreier em jogos, desenvolvedor nas horas vagas 🥴",
    status: "dnd"
  },

  susielaser: {
    name: "susielaser",
    avatar: "https://i.imgur.com/Ad4sTiX.png",
    desc: "https://guns.lol/susiexz",
    status: "dnd"
  },

  Yingloomy: {
    name: "Yingloomy",
    avatar: "https://i.imgur.com/10DtG0n.png",
    desc: "Gosto de RTS, FPS e jogos sandbox, além de história e geografia.",
    status: "dnd"
  },

  yoserius: {
    name: "yoserius",
    avatar: "https://cdn.imgchest.com/files/8524d3e0e4eb.png",
    desc: "O ser humano quase perfeito",
    status: "dnd"
  },

  Zilirian: {
    name: "Zilirian",
    avatar: "https://i.imgur.com/3R7sQVb.png",
    desc: "Undecided",
    status: "dnd"
  },

  jpxwf12: {
    name: "jpxwf12",
    avatar: "https://i.imgur.com/Qc9S9bX.png",
    desc: "Maníaco por carros, estudante de programação",
    status: "dnd"
  },

  jann: {
    name: "jann",
    avatar: "https://i.imgur.com/2wfpG1n.png",
    desc: "17 anos, gosta de esportes, mangás e anime.",
    status: "dnd"
  }
};
