const menuButton = document.querySelector('.menu-toggle');
const menu = document.querySelector('.nav-links');
menuButton?.addEventListener('click', () => {
  const open = menu.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(open));
});
menu?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  menu.classList.remove('open');
  menuButton?.setAttribute('aria-expanded', 'false');
}));
const year = document.querySelector('#year');
if (year) year.textContent = new Date().getFullYear();
const matrix = document.querySelector('#matrix-grid');
if (matrix) {
  const active = new Set();
  for (let y = 0; y < 16; y++) for (let x = 0; x < 16; x++) {
    const circle = (x-7.5)**2 + (y-7.5)**2;
    const ring = circle > 23 && circle < 48;
    const chip = (x >= 6 && x <= 9 && y >= 6 && y <= 9);
    if (ring || chip) active.add(y * 16 + x);
  }
  const fragment = document.createDocumentFragment();
  for (let i = 0; i < 256; i++) {
    const led = document.createElement('i');
    if (active.has(i)) led.className = 'on';
    fragment.appendChild(led);
  }
  matrix.appendChild(fragment);
}
