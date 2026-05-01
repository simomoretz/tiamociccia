/* ================================================
   script.js — Per la mia Ciccia
   ================================================ */

const CONFIG = {
  startDate:   new Date(2026, 2, 27),
  songTitle:   "Ti am*",
  songArtist:  "nayt",
  spotifyLink: "https://open.spotify.com/intl-it/track/0EWC93nihVzMw5HI6Crf5V?si=0b4d43bb53ce4448",
  photos: [
    { src: "images/foto1.jpg", caption: "Il nostro primo ricordo" },
    { src: "images/foto2.jpg", caption: "La mia preferita" },
    { src: "images/foto3.jpg", caption: "Che bella giornata" },
    { src: "images/foto4.jpg", caption: "Sempre bellissima" },
    { src: "images/foto5.jpg", caption: "Indimenticabile" },
    { src: "images/foto6.jpg", caption: "Noi due" },
    { src: "images/foto7.jpg", caption: "Bellissima come sempre" },
    { src: "images/foto8.jpg", caption: "Il nostro posto" }
  ]
};

/* ── 1. PETALI ── */
(function initPetals() {
  const container = document.getElementById("petals");
  if (!container) return;
  const heartSVG = `<svg viewBox="0 0 20 18" width="13" height="13" fill="currentColor"><path d="M10 17C10 17 1 11 1 5.5A4.5 4.5 0 0 1 10 2.8 4.5 4.5 0 0 1 19 5.5C19 11 10 17 10 17Z"/></svg>`;
  const colors = ["var(--rose)", "var(--warm)", "var(--rose-deep)", "var(--rose)"];
  for (let i = 0; i < 18; i++) {
    const el = document.createElement("div");
    el.className = "petal";
    el.innerHTML = heartSVG;
    el.style.color = colors[Math.floor(Math.random() * colors.length)];
    el.style.left = Math.random() * 100 + "%";
    el.style.animationDuration = (8 + Math.random() * 10) + "s";
    el.style.animationDelay = -(Math.random() * 16) + "s";
    el.style.fontSize = (0.7 + Math.random() * 0.6) + "rem";
    container.appendChild(el);
  }
})();

/* ── 2. TEMA ── */
(function initTheme() {
  const btn  = document.getElementById("themeToggle");
  const root = document.documentElement;
  if (!btn) return;
  const hour = new Date().getHours();
  const autoDark = hour < 7 || hour >= 21;
  let savedTheme = null;
  try { savedTheme = localStorage.getItem("theme"); } catch(e) {}
  const theme = savedTheme || (autoDark ? "dark" : "light");
  applyTheme(theme);
  btn.addEventListener("click", () => {
    const next = root.dataset.theme === "dark" ? "light" : "dark";
    applyTheme(next);
    try { localStorage.setItem("theme", next); } catch(e) {}
  });
  function applyTheme(t) {
    root.dataset.theme = t;
    btn.innerHTML = t === "dark"
      ? `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>`
      : `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`;
    btn.setAttribute("aria-label", t === "dark" ? "Passa alla modalità chiara" : "Passa alla modalità scura");
  }
})();

/* ── 3. CONTATORE ── */
(function initCounter() {
  const y = document.getElementById("cnt-years");
  const m = document.getElementById("cnt-months");
  const d = document.getElementById("cnt-days");
  const h = document.getElementById("cnt-hours");
  if (!y || !m || !d || !h) return;
  function update() {
    const now   = new Date();
    const start = CONFIG.startDate;
    if (now < start) return;
    let years  = now.getFullYear() - start.getFullYear();
    let months = now.getMonth()    - start.getMonth();
    let days   = now.getDate()     - start.getDate();
    let hours  = now.getHours()    - start.getHours();
    if (now.getMinutes() < start.getMinutes()) hours--;
    if (hours < 0)  { hours += 24; days--; }
    if (days < 0)   { months--; days += new Date(now.getFullYear(), now.getMonth(), 0).getDate(); }
    if (months < 0) { years--; months += 12; }
    y.textContent = years;
    m.textContent = months;
    d.textContent = days;
    h.textContent = hours;
  }
  update();
  setInterval(update, 60000);
})();

/* ── 4. GALLERIA ── */
(function initGallery() {
  const grid = document.getElementById("photoGrid");
  if (!grid) return;
  const lightbox = document.createElement("div");
  lightbox.className = "lightbox";
  lightbox.innerHTML = `<button class="lightbox-close" aria-label="Chiudi">&times;</button><img id="lb-img" src="" alt=""><p id="lb-cap" class="lightbox-caption"></p>`;
  document.body.appendChild(lightbox);
  const lbImg  = document.getElementById("lb-img");
  const lbCap  = document.getElementById("lb-cap");
  const closeBtn = lightbox.querySelector(".lightbox-close");
  function open(src, cap) { lbImg.src = src; lbImg.alt = cap; lbCap.textContent = cap; lightbox.classList.add("open"); document.body.style.overflow = "hidden"; }
  function close() { lightbox.classList.remove("open"); document.body.style.overflow = ""; lbImg.src = ""; }
  closeBtn.addEventListener("click", close);
  lightbox.addEventListener("click", e => { if (e.target === lightbox) close(); });
  document.addEventListener("keydown", e => { if (e.key === "Escape") close(); });
  CONFIG.photos.forEach(({ src, caption }) => {
    const card = document.createElement("div");
    card.className = "photo-card";
    card.innerHTML = `<img src="${src}" alt="${caption}" loading="lazy"><div class="photo-card-overlay"><span class="photo-card-caption">${caption}</span></div>`;
    card.addEventListener("click", () => open(src, caption));
    grid.appendChild(card);
  });
})();

/* ── 5. CANZONE ── */
(function initSong() {
  const title  = document.getElementById("song-title");
  const artist = document.getElementById("song-artist");
  const link   = document.getElementById("spotify-link");
  const vinyl  = document.getElementById("vinyl");
  if (title)  title.textContent  = CONFIG.songTitle;
  if (artist) artist.textContent = CONFIG.songArtist;
  if (link)   link.href          = CONFIG.spotifyLink;
  if (vinyl && link) {
    [vinyl, link].forEach(el => el.addEventListener("click", () => vinyl.classList.toggle("playing")));
  }
})();

/* ── 6. SEGRETO ── */
(function initSecret() {
  const card = document.getElementById("secretCard");
  if (!card) return;
  card.addEventListener("click", () => card.classList.toggle("flipped"));
})();

/* ── 7. SCROLL ANIMATIONS ── */
(function initScroll() {
  const items = document.querySelectorAll(".reason-card, .adoro-card, .fade-up");
  if (!items.length) return;
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  items.forEach(el => observer.observe(el));
})();

/* ── 8. NAVBAR HIDE ON SCROLL ── */
(function initNavbar() {
  const nav = document.getElementById("navbar");
  if (!nav) return;
  let lastY = 0;
  window.addEventListener("scroll", () => {
    const y = window.scrollY;
    nav.style.transition = "transform 0.35s ease";
    nav.style.transform  = (y > 60 && y > lastY) ? "translateY(-100%)" : "translateY(0)";
    lastY = y;
  }, { passive: true });
})();