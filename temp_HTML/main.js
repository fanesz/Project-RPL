let prevScrollPos = window.pageYOffset;
const nav = document.querySelector('nav');
let viewportWidth = window.innerWidth;

function updateNavVisibility() {
  if (viewportWidth < 768) {
    const currentScrollPos = window.pageYOffset;
    if (prevScrollPos > currentScrollPos) {
      nav.classList.add('visible');
      nav.classList.remove('hidden');
    } else {
      nav.classList.add('hidden');
      nav.classList.remove('visible');
    }
    prevScrollPos = currentScrollPos;
  } else {
    nav.classList.add('visible');
    nav.classList.remove('hidden');
  }
}

window.addEventListener('scroll', updateNavVisibility);
window.addEventListener('resize', () => {
  viewportWidth = window.innerWidth;
  updateNavVisibility();
});
