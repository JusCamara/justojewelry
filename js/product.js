/**
 * Justo Jewelry Product Page Module
 * Handles product carousel and related interactions
 */

/**
 * Displays a specific image in the carousel
 * @param {number} idx - Index of the image to display
 */
function showImage(idx) {
  const images = document.querySelectorAll('.carousel-img');
  const thumbs = document.querySelectorAll('.thumb');
  
  // Return early if elements don't exist
  if (!images.length || !thumbs.length) return;
  
  // Hide all images and remove active state from thumbnails
  images.forEach(img => img.classList.remove('active'));
  thumbs.forEach(thumb => thumb.classList.remove('active'));
  
  // Show the selected image and activate matching thumbnail
  if (images[idx]) images[idx].classList.add('active');
  if (thumbs[idx]) thumbs[idx].classList.add('active');
  
  // Store current index as a data attribute on the carousel for other functions
  const carousel = document.querySelector('.carousel');
  if (carousel) carousel.dataset.currentIndex = idx;
}

/**
 * Moves to the next image in the carousel
 */
function nextImage() {
  const images = document.querySelectorAll('.carousel-img');
  if (!images.length) return;
  
  const carousel = document.querySelector('.carousel');
  const currentIndex = parseInt(carousel?.dataset.currentIndex || 0);
  const nextIndex = (currentIndex + 1) % images.length;
  
  showImage(nextIndex);
}

/**
 * Moves to the previous image in the carousel
 */
function prevImage() {
  const images = document.querySelectorAll('.carousel-img');
  if (!images.length) return;
  
  const carousel = document.querySelector('.carousel');
  const currentIndex = parseInt(carousel?.dataset.currentIndex || 0);
  const prevIndex = (currentIndex - 1 + images.length) % images.length;
  
  showImage(prevIndex);
}

/**
 * Initializes product page functionality
 */
function initProductPage() {
  // Set up carousel navigation
  const images = document.querySelectorAll('.carousel-img');
  const thumbs = document.querySelectorAll('.thumb');
  const nextBtn = document.querySelector('.carousel-btn.next');
  const prevBtn = document.querySelector('.carousel-btn.prev');
  
  // Initialize with first image
  showImage(0);
  
  // Add click handlers to navigation buttons
  if (nextBtn) nextBtn.addEventListener('click', nextImage);
  if (prevBtn) prevBtn.addEventListener('click', prevImage);
  
  // Add click handlers to thumbnails
  thumbs.forEach((thumb, i) => {
    thumb.addEventListener('click', () => showImage(i));
  });
  
  // Add keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') nextImage();
    if (e.key === 'ArrowLeft') prevImage();
  });
  
  // Add swipe support for touch devices
  const carousel = document.querySelector('.carousel-images');
  if (carousel) {
    let touchStartX = 0;
    let touchEndX = 0;
    
    carousel.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    });
    
    carousel.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    });
    
    function handleSwipe() {
      const swipeThreshold = 50;
      if (touchEndX < touchStartX - swipeThreshold) {
        // Swipe left, show next image
        nextImage();
      }
      if (touchEndX > touchStartX + swipeThreshold) {
        // Swipe right, show previous image
        prevImage();
      }
    }
  }
  
  // Add form submission handler
  const form = document.querySelector('.product-customization');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      // Get selected options
      const size = document.getElementById('size')?.value;
      const metal = document.getElementById('Metal')?.value;
      
      // Show confirmation to user
      alert(`Added to cart: ${document.querySelector('h2')?.textContent} (${size}, ${metal})`);
    });
  }
}

// Initialize when DOM is loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initProductPage);
} else {
  initProductPage();
}
