# Justo Jewelry Website

A modern, animated jewelry showcase website featuring a visually striking landing page with preloaded animations and a product catalog.

## Project Overview

Justo Jewelry is a premium jewelry brand website designed to showcase artisanal jewelry products through an immersive, animation-focused user experience. The website features:

- Animated landing page with sequential image preloading
- Interactive product showcase 
- Mobile-responsive design with hamburger menu navigation
- Dark/greyscale aesthetic for the product pages
- Clean, minimalist interface that puts focus on the product images

## File Structure

```
justojewelry-main/
├── index.html             # Main landing page with animations
├── prodcut.html           # Product showcase page (note the typo: should be "product.html")
├── about.html             # About page (placeholder)
├── contact.html           # Contact page (placeholder)
├── collection.html        # Collection page (placeholder)
├── style.css              # Main CSS styles
├── burger-menu.css        # Hamburger menu styles (partially implemented)
├── burger-styles.css      # Additional hamburger menu styles
├── images/                # Image assets
│   ├── DSC05292.JPG      # Jewelry image 1
│   ├── DSC05296.JPG      # Jewelry image 2
│   ├── DSC05300.JPG      # Jewelry image 3
│   ├── DSC05308.JPG      # Jewelry image 4
│   └── IMG_1298.jpg      # Jewelry image 5
├── css/                   # CSS directory
│   └── js/               # JavaScript directory (misplaced)
│       └── main.js       # Supplementary JavaScript functionality
├── CNAME                  # Domain configuration for GitHub Pages
└── README.md              # Project documentation
```

## Architecture and Code Organization

The website follows a simple architecture:

1. **Landing Page (index.html)**: 
   - Features an animated preloader that sequentially displays product images
   - Uses GSAP for smooth animations and transitions
   - Includes a hamburger menu for mobile navigation
   - Uses CSS for styling and animations

2. **Product Page (prodcut.html)**:
   - Showcases individual products with image carousel
   - Offers product customization options
   - Displays related products
   - Uses a dark/greyscale aesthetic

3. **Style Organization**:
   - Main styles in style.css
   - Hamburger menu styles split between inline styles and separate CSS files
   - Additional CSS overrides in product page for specific layout needs

4. **JavaScript**:
   - GSAP for main animations in index.html
   - Vanilla JavaScript for product carousel in prodcut.html
   - main.js for additional menu functionality

## Key Technologies Used

- **HTML5**: Semantic structure and content
- **CSS3**: Styling, animations, and responsive design
- **JavaScript**: DOM manipulation and interactive features
- **GSAP 3.11.3**: Advanced animations and timeline sequencing
- **Font Awesome 6.4.0**: Icon library for UI elements
- **Google Fonts (Montserrat)**: Typography

## Animation Implementation

### Landing Page Animations

The landing page features a sophisticated animation sequence:

1. **Preloader Animation**:
   - Sequential image reveals using clip-path
   - Percentage counter that updates with each image
   - Text fade-ins and color transitions
   - Uses GSAP timeline for precise sequencing

2. **Final State Animation**:
   - Expansion of final image to fullscreen
   - Fade-in of navigation elements
   - Appearance of title text with staggered animation
   - Display of brand messaging

3. **Restart Button**:
   - Animated dot pattern
   - Hover effects that reveal additional elements
   - Resets and replays the entire animation sequence

### Product Page Animations

- Simple image carousel with fade transitions
- Hover effects on buttons and product cards
- Smooth transitions for interactive elements

## Setup and Installation

1. **Clone the repository**:
   ```
   git clone https://github.com/yourusername/justojewelry-main.git
   cd justojewelry-main
   ```

2. **Local Development**:
   The website is built with plain HTML, CSS, and JavaScript, so you can simply open the HTML files in a browser. For a better development experience:

   ```
   # Using Python's built-in server
   python -m http.server 8000
   
   # Or using Node.js with a simple server like http-server
   npx http-server
   ```

3. **Deployment**:
   The website is configured for GitHub Pages deployment with a custom domain (justojewelry.com).

## Browser Compatibility

The website is compatible with:

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

Mobile compatibility is implemented through:
- Responsive design with media queries
- Touch-friendly interface elements
- Hamburger menu for mobile navigation

## Known Issues and Limitations

1. **File Structure Issues**:
   - JavaScript files are incorrectly placed in the CSS directory
   - Multiple hamburger menu CSS files with duplicate/conflicting styles

2. **Performance Concerns**:
   - Large image files (2.3-6.7MB) impact loading time
   - No image optimizations or lazy loading
   - All animation images loaded upfront

3. **Code Quality**:
   - Duplicate CSS rules for similar elements
   - Inline styles mixed with external stylesheets
   - Missing accessibility attributes on interactive elements
   - Typo in filename: "prodcut.html" instead of "product.html"

4. **Accessibility Issues**:
   - Animations do not respect reduced motion preferences
   - Missing ARIA attributes on interactive elements
   - Color contrast may be insufficient in some areas
   - Keyboard navigation is not fully implemented

5. **Browser Inconsistencies**:
   - ClipPath animations may not work consistently across all browsers
   - CSS properties missing vendor prefixes for older browsers

## Future Improvement Opportunities

1. **Performance Optimization**:
   - Implement image optimization (compression, WebP format)
   - Add lazy loading for images
   - Minify CSS and JavaScript files
   - Implement critical CSS loading

2. **Code Organization**:
   - Reorganize file structure for better maintainability
   - Create separate JS files for each component/feature
   - Implement a build process to compile and optimize assets

3. **Accessibility Enhancements**:
   - Add proper ARIA attributes to interactive elements
   - Implement keyboard navigation
   - Add reduced motion media queries for animations
   - Improve color contrast for better readability

4. **Feature Additions**:
   - Complete the empty placeholder pages (about, contact, collection)
   - Add e-commerce functionality (cart, checkout)
   - Implement a content management system for easier updates
   - Add product filtering and search capabilities

5. **Testing and Optimization**:
   - Implement automated testing for UI components
   - Add performance monitoring
   - Create a continuous integration pipeline
   - Optimize for SEO with meta tags and structured data