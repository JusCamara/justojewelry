/**
 * Handles hamburger menu functionality
 */
const burgerMenu = document.getElementById('burger-menu');
const overlay = document.getElementById('menu');

if (burgerMenu && overlay) {
  burgerMenu.addEventListener('click', () => {
    burgerMenu.classList.toggle("close");
    overlay.classList.toggle("overlay");
  });
}

// Close menu when clicking outside
if (overlay) {
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) {
      overlay.classList.remove('overlay');
      if (burgerMenu) {
        burgerMenu.classList.remove('close');
      }
    }
  });
}
