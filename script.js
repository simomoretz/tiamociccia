/* ══════════════════════════════════════
   script.js — Per la mia Ciccia ❤️
══════════════════════════════════════ */

const CONFIG = {
  startDate: new Date(2026, 2, 27),

  songTitle: "Ti am*",
  songArtist: "nayt",
  spotifyLink: "https://open.spotify.com/intl-it/track/0EWC93nihVzMw5HI6Crf5V?si=0b4d43bb53ce4448",

  photos: [
    { src: "images/foto1.jpg", caption: "Il nostro primo ricordo ❤️" },
    { src: "images/foto2.jpg", caption: "La mia preferita 🌸" },
    { src: "images/foto3.jpg", caption: "Che bella giornata ✨" },
    { src: "images/foto4.jpg", caption: "Sempre bellissima 💕" },
    { src: "images/foto5.jpg", caption: "Indimenticabile 🌹" },
    { src: "images/foto6.jpg", caption: "Ti amo da morire 💖" },
    { src: "images/foto7.jpg", caption: "Anche così sei troppo bella 💖" },
    { src: "images/foto8.jpg", caption: "Il nostro luogo 📍" }
  ]
};

/* ── 1. PETALI CHE CADONO ── */
(function initPetals() {
  const container = document.getElementById("petals");
  if (!container) return;

  const symbols = ["🌸", "🌹", "💗", "🌺", "💖", "🌷", "✨", "💕"];
  const N = 20;

  for (let i = 0; i < N; i++) {
    const el = document.createElement("div");
    el.className = "petal";
    el.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    el.style.cssText = [
      `font-size: ${0.9 + Math.random() * 0.9}rem`,
      `left: ${Math.random() * 100}%`,
      `animation-duration: ${7 + Math.random() * 10}s`,
      `animation-delay: ${-(Math.random() * 14)}s`
    ].join(";");

    container.appendChild(el);
  }
})();

/* ── 2. TEMA CHIARO / SCURO ── */
(function initTheme() {
  const btn = document.getElementById("themeToggle");
  const root = document.documentElement;
  if (!btn) return;

  const hour = new Date().getHours();
  const autoDark = hour < 7 || hour >= 21;

  let savedTheme = null;
  try {
    savedTheme = localStorage.getItem("theme");
  } catch (e) {
    savedTheme = null;
  }

  const theme = savedTheme || (autoDark ? "dark" : "light");
  applyTheme(theme);

  btn.addEventListener("click", () => {
    const next = root.dataset.theme === "dark" ? "light" : "dark";
    applyTheme(next);

    try {
      localStorage.setItem("theme", next);
    } catch (e) {}
  });

  function applyTheme(t) {
    root.dataset.theme = t;
    btn.textContent = t === "dark" ? "☀️" : "🌙";
  }
})();

/* ── 3. CONTATORE TEMPO INSIEME ── */
(function initCounter() {
  function update() {
    const now = new Date();
    const start = CONFIG.startDate;

    if (now < start) return;

    let years = now.getFullYear() - start.getFullYear();
    let months = now.getMonth() - start.getMonth();
    let days = now.getDate() - start.getDate();
    let hours = now.getHours() - start.getHours();
    let minutes = now.getMinutes() - start.getMinutes();

    if (minutes < 0) {
      minutes += 60;
      hours--;
    }

    if (hours < 0) {
      hours += 24;
      days--;
    }

    if (days < 0) {
      months--;
      const daysInPrevMonth = new Date(now.getFullYear(), now.getMonth(), 0).getDate();
      days += daysInPrevMonth;
    }

    if (months < 0) {
      years--;
      months += 12;
    }

    document.getElementById("cnt-years").textContent = years;
    document.getElementById("cnt-months").textContent = months;
    document.getElementById("cnt-days").textContent = days;
    document.getElementById("cnt-hours").textContent = hours;
  }

  update();
  setInterval(update, 60000);
})();

/* ── 4. GALLERY FOTO ── */
(function initGallery() {
  const grid = document.getElementById("photoGrid");
  if (!grid) return;

  const lightbox = document.createElement("div");
  lightbox.className = "lightbox";
  lightbox.innerHTML = `
    <button class="lightbox-close" aria-label="Chiudi">×</button>
    <img src="" alt="" id="lb-img">
    <p class="lightbox-caption" id="lb-cap"></p>
  `;
  document.body.appendChild(lightbox);

  const lbImg = document.getElementById("lb-img");
  const lbCap = document.getElementById("lb-cap");
  const closeBtn = lightbox.querySelector(".lightbox-close");

  function openLightbox(src, caption) {
    lbImg.src = src;
    lbImg.alt = caption;
    lbCap.textContent = caption;
    lightbox.classList.add("open");
    document.body.style.overflow = "hidden";
  }

  function closeLightbox() {
    lightbox.classList.remove("open");
    document.body.style.overflow = "";
    lbImg.src = "";
  }

  closeBtn.addEventListener("click", closeLightbox);

  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeLightbox();
  });

  CONFIG.photos.forEach(({ src, caption }) => {
    const card = document.createElement("div");
    card.className = "photo-card";
    card.innerHTML = `
      <img src="${src}" alt="${caption}" loading="lazy">
      <div class="photo-caption">${caption}</div>
    `;
    card.addEventListener("click", () => openLightbox(src, caption));
    grid.appendChild(card);
  });
})();

/* ── 5. CANZONE ── */
(function initSong() {
  const title = document.getElementById("song-title");
  const artist = document.getElementById("song-artist");
  const link = document.getElementById("spotify-link");
  const vinyl = document.getElementById("vinyl");

  if (title) title.textContent = CONFIG.songTitle;
  if (artist) artist.textContent = CONFIG.songArtist;
  if (link) link.href = CONFIG.spotifyLink;

  if (link && vinyl) {
    link.addEventListener("click", () => {
      vinyl.classList.toggle("playing");
    });

    vinyl.addEventListener("click", () => {
      vinyl.classList.toggle("playing");
    });
  }
})();

/* ── 6. SEGRETO ── */
(function initSecret() {
  const card = document.getElementById("secretCard");
  if (!card) return;

  card.addEventListener("click", () => {
    card.classList.toggle("flipped");
  });
})();

/* ── 7. ANIMAZIONE REASON CARDS ── */
(function initReasonCards() {
  const cards = document.querySelectorAll(".reason-card");
  if (!cards.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const delay = entry.target.dataset.delay || 0;
        setTimeout(() => {
          entry.target.classList.add("visible");
        }, Number(delay));
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  cards.forEach((card) => observer.observe(card));
})();

/* ── 8. NAVBAR ── */
(function initNavbar() {
  const nav = document.getElementById("navbar");
  if (!nav) return;

  let lastY = 0;

  window.addEventListener("scroll", () => {
    const y = window.scrollY;

    if (y < 60) {
      nav.style.transform = "translateY(0)";
    } else if (y > lastY) {
      nav.style.transform = "translateY(-100%)";
    } else {
      nav.style.transform = "translateY(0)";
    }

    nav.style.transition = "transform 0.35s ease";
    lastY = y;
  }, { passive: true });
})();