(() => {
  const stars = document.querySelector('#nextStars');
  const shooting = document.querySelector('#nextShootingStars');
  if (!stars || !shooting) return;

  const count = Math.min(110, Math.max(70, Math.floor(window.innerWidth / 12)));
  for (let i = 0; i < count; i++) {
    const s = document.createElement('i');
    s.style.left = `${Math.random() * 100}%`;
    s.style.top = `${Math.random() * 82}%`;
    s.style.setProperty('--twinkle', `${2 + Math.random() * 4}s`);
    s.style.animationDelay = `${Math.random() * 5}s`;
    stars.appendChild(s);
  }

  function makeShootingStar() {
    const s = document.createElement('i');
    s.style.left = `${55 + Math.random() * 35}%`;
    s.style.top = `${5 + Math.random() * 30}%`;
    shooting.appendChild(s);
    setTimeout(() => s.remove(), 1600);
  }

  setInterval(makeShootingStar, 6500);
})();
