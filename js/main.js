(() => {
  const starLayer = document.querySelector('.landing-stars');
  if (!starLayer) return;
  const count = Math.min(90, Math.floor(window.innerWidth / 14));
  for (let i = 0; i < count; i++) {
    const star = document.createElement('i');
    star.style.left = `${Math.random() * 100}%`;
    star.style.top = `${Math.random() * 100}%`;
    star.style.animationDelay = `${Math.random() * 4}s`;
    star.style.animationDuration = `${2 + Math.random() * 4}s`;
    starLayer.appendChild(star);
  }
})();
