(() => {
  const audio = document.querySelector('#audio');
  const lyrics = document.querySelector('#lyrics');
  const kicker = document.querySelector('#messageKicker');
  const toggle = document.querySelector('#musicToggle');
  const ending = document.querySelector('#ending');
  const restart = document.querySelector('#restart');
  const stars = document.querySelector('#stars');
  const shooting = document.querySelector('#shootingStars');
  const particles = document.querySelector('#particles');

  // Texto principal 
  const messages = [
    `Mi vida era puro ruido y desorden cuando apareciste. No hubo avisos ni señales previas: simplemente llegaste de la nada, cruzando en medio de mi propio caos, en un momento donde todo parecía fuera de lugar.`,

    `A veces me pregunto qué fuerza o casualidad te puso en mi camino, porque desde ese instante exacto, sin explicaciones lógicas ni promesas vacías, todo a mi alrededor empezó a mejorar.`, 

    `Tu presencia trajo una calma que no sabía que necesitaba; fuiste la certeza que le dio sentido a los días difíciles y el punto fijo donde por fin pude descansar. No fue magia, fue tu forma de estar, de mirar y de quedarte.`,

    `No quiero guardarme más lo evidente ni dejar que el tiempo diluya lo que provocas en mí. Reconozco el impacto que has tenido en mi historia y quiero seguir caminando a tu lado. `, 
    
    `construyendo sobre esta paz que trajiste a mi mundo. Hoy elijo decírtelo con absoluta firmeza: me gustas, quiero estar contigo y apostar de verdad por todo lo que somos cuando estamos juntos.`,

    `No escribo esto para adornar lo que siento, lo escribo porque guardármelo sería negar una verdad evidente: quiero estar a tu lado sin prisas pero sin dudas, descubrir lo que construimos cuando dejamos de fingir distancia y apostar por todo lo que provocas en mí.`, 

    `Si el amor tiene que empezar con un paso valiente, que sea este: elijo estar contigo, sin reservas, con el pecho abierto y la certeza entera.`, 

    `la pregunta es si usted me deja ser parte de su vida, quiere ser parte de la mia ? (por si no la capto quiere ser mi novia ?)`

    
  ];

  // 108 palabras por minuto: ritmo deliberadamente tranquilo para un texto romántico.
  const READING_WPM = 108;
  const FIRST_MESSAGE_AT = 15;
  const GAP_BETWEEN_MESSAGES = 2.5;
  const FADE_IN = 1.8;
  const FADE_OUT = 2.2;

  const wordCount = text => text.trim().split(/\s+/).length;
  const readingTime = text => (wordCount(text) / READING_WPM) * 60;

  // Los tiempos se calculan a partir de la longitud real de cada párrafo,
  // así no tenemos que adivinar manualmente cuánto debe durar cada uno.
  const timeline = [];
  let cursor = FIRST_MESSAGE_AT;

  messages.forEach((text, index) => {
    const duration = readingTime(text) + 3.5;
    timeline.push({
      text,
      start: cursor,
      end: cursor + duration,
      index
    });
    cursor += duration + GAP_BETWEEN_MESSAGES;
  });

  for (let i = 0; i < 100; i++) {
    const s = document.createElement('i');
    s.style.left = `${Math.random() * 100}%`;
    s.style.top = `${Math.random() * 75}%`;
    s.style.setProperty('--twinkle', `${2 + Math.random() * 4}s`);
    s.style.animationDelay = `${Math.random() * 5}s`;
    stars.appendChild(s);
  }

  for (let i = 0; i < 32; i++) {
    const p = document.createElement('i');
    p.style.left = `${Math.random() * 100}%`;
    p.style.top = `${45 + Math.random() * 45}%`;
    p.style.setProperty('--drift', `${(Math.random() - .5) * 90}px`);
    p.style.setProperty('--duration', `${5 + Math.random() * 8}s`);
    p.style.animationDelay = `${Math.random() * 8}s`;
    particles.appendChild(p);
  }

  function makeShootingStar() {
    const s = document.createElement('i');
    s.style.left = `${55 + Math.random() * 35}%`;
    s.style.top = `${5 + Math.random() * 30}%`;
    shooting.appendChild(s);
    setTimeout(() => s.remove(), 1600);
  }
  setInterval(makeShootingStar, 6500);

  function updateLyrics() {
    if (!audio || !lyrics) return;

    const time = audio.currentTime;
    const current = timeline.find(item => time >= item.start && time < item.end);

    if (current) {
      const elapsed = time - current.start;
      const remaining = current.end - time;

      // Aparición suave, lectura estable y salida lenta.
      const fadeIn = Math.min(1, elapsed / FADE_IN);
      const fadeOut = Math.min(1, remaining / FADE_OUT);
      const opacity = Math.min(fadeIn, fadeOut);
      const lift = (1 - fadeIn) * 18 - (1 - fadeOut) * 8;

      lyrics.style.opacity = opacity.toFixed(3);
      lyrics.style.transform = `translate(-50%, ${lift}px)`;
      lyrics.textContent = current.text;
      kicker.textContent = `✦ para ti · ${current.index + 1} / ${timeline.length}`;
    } else {
      lyrics.style.opacity = '0';
      lyrics.style.transform = 'translate(-50%, 10px)';
    }
  }

  function sync() {
    updateLyrics();
    requestAnimationFrame(sync);
  }
  requestAnimationFrame(sync);

  function setPlayingState() {
    const playing = !audio.paused;
    toggle.innerHTML = playing ? 'Ⅱ <span>pausar</span>' : '♫ <span>reproducir</span>';
    document.body.classList.toggle('music-playing', playing);
  }

  toggle.addEventListener('click', async () => {
    try {
      if (audio.paused) await audio.play(); else audio.pause();
      setPlayingState();
    } catch {
      toggle.innerHTML = '♫ <span>haz clic para iniciar</span>';
    }
  });

  audio.addEventListener('play', setPlayingState);
  audio.addEventListener('pause', setPlayingState);
  audio.addEventListener('ended', () => {
    setPlayingState();
    setTimeout(() => ending.classList.add('show'), 700);
  });

  restart.addEventListener('click', () => {
    ending.classList.remove('show');
    audio.currentTime = 0;
    audio.play().catch(() => {});
  });

  // El navegador suele bloquear autoplay: intentamos una vez y dejamos el botón listo.
  audio.play().catch(() => {});
})();