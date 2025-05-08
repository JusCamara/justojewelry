/**
 * Justo Jewelry Animation Module
 * Handles all animation sequences for the landing page
 */

// Check for reduced motion preference
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/**
 * Registers GSAP plugins and creates custom easing functions
 */
function setupGSAP() {
  // Register GSAP plugins
  gsap.registerPlugin(CustomEase);

  // Create custom easing functions
  CustomEase.create("customEase", "0.6, 0.01, 0.05, 1");
  CustomEase.create("gentle", "0.38, 0.005, 0.215, 1");
}

/**
 * Check for browser support of clip-path
 * @return {boolean} Whether clip-path is supported
 */
function supportsClipPath() {
  return CSS.supports('clip-path', 'inset(0)') || 
         CSS.supports('-webkit-clip-path', 'inset(0)');
}

/**
 * Initializes the animation sequence for the landing page
 * @returns {gsap.core.Timeline} The main animation timeline
 */
function initAnimation() {
  // Setup initial states
  gsap.set(".restart-btn", { opacity: 0, pointerEvents: "none" });
  gsap.set(".header", { opacity: 1 });
  gsap.set(".logo-left, .nav-right", { opacity: 0, y: 10 });
  gsap.set(".text-container-final", { opacity: 0 });
  gsap.set(".text-line-final", { opacity: 0 });
  gsap.set(".big-title", { opacity: 0 });
  gsap.set(".big-title .title-line span", { y: "100%", opacity: 0 });
  gsap.set(".image-wrapper", { visibility: "hidden" });
  
  // Apply clip-path only if supported
  if (supportsClipPath()) {
    gsap.set(".image-wrapper", { clipPath: "inset(100% 0 0 0)" });
  }
  
  gsap.set("#image-0", { visibility: "visible" });
  gsap.set(".image-wrapper img", { scale: 1.2 });

  const timeline = gsap.timeline();
  const percentages = [0, 25, 50, 75, 99];
  const wrappers = [
    document.getElementById("image-0"),
    document.getElementById("image-25"),
    document.getElementById("image-50"),
    document.getElementById("image-75"),
    document.getElementById("image-100")
  ];
  const percentageElement = document.querySelector(".preloader-percentage");

  // Adjust animation duration for reduced motion preference
  const baseDuration = prefersReducedMotion ? 0.1 : 0.15;
  const imageTransitionDuration = prefersReducedMotion ? 0.3 : 0.65;
  const stepMultiplier = prefersReducedMotion ? 0.5 : 1.5;

  // Animate text lines in with optimized staggering
  timeline.to(".text-line", {
    opacity: 1,
    duration: baseDuration,
    stagger: {
      each: 0.075,
      from: "start",
      ease: "power1.inOut"
    },
    ease: "gentle"
  }, 0.5);

  // Animate text color change
  timeline.to(".text-line", {
    color: "#fff",
    duration: baseDuration,
    stagger: 0.075
  }, "+=0.5");

  // Animate image transitions
  percentages.forEach((percentage, index) => {
    timeline.add(`step${percentage}`, index * stepMultiplier);
    
    // Show current image
    timeline.set(wrappers[index], { visibility: "visible" }, `step${percentage}`);
    
    if (supportsClipPath()) {
      // Use clip-path animation if supported
      timeline.to(wrappers[index], {
        clipPath: "inset(0% 0 0 0)",
        duration: imageTransitionDuration,
        ease: "customEase",
        force3D: true // Hardware acceleration
      }, `step${percentage}`);
    } else {
      // Fallback to opacity animation
      timeline.to(wrappers[index], {
        opacity: 1,
        duration: imageTransitionDuration,
        ease: "customEase"
      }, `step${percentage}`);
    }
    
    // Update percentage counter
    timeline.to(percentageElement, {
      innerText: `${percentage}`,
      duration: imageTransitionDuration,
      snap: { innerText: 1 }
    }, `step${percentage}`);
    
    // Hide previous image
    if (index > 0) {
      if (supportsClipPath()) {
        timeline.to(wrappers[index - 1], {
          clipPath: "inset(100% 0 0 0)",
          duration: imageTransitionDuration * 0.8,
          ease: "customEase",
          onComplete: function() {
            gsap.set(wrappers[index - 1], { visibility: "hidden" });
          }
        }, `step${percentage}+=0.15`);
      } else {
        timeline.to(wrappers[index - 1], {
          opacity: 0,
          duration: imageTransitionDuration * 0.8,
          ease: "customEase",
          onComplete: function() {
            gsap.set(wrappers[index - 1], { visibility: "hidden" });
          }
        }, `step${percentage}+=0.15`);
      }
    }
  });

  // Fade out preloader text
  timeline.to(".text-line", {
    opacity: 0,
    duration: baseDuration,
    stagger: 0.075
  }, "step99+=1");

  // Final expansion phase
  timeline.add("expandFinal", ">");
  
  // Expand image to fullscreen
  timeline.to(".image-container", {
    width: "100vw",
    height: "100vh",
    duration: prefersReducedMotion ? 0.5 : 1.2,
    ease: "gentle"
  }, "expandFinal+=0.5");
  
  // Scale image
  timeline.to("#image-100 img", {
    scale: 1.0,
    duration: prefersReducedMotion ? 0.5 : 1.2,
    ease: "gentle"
  }, "expandFinal+=0.5");
  
  // Fade out percentage
  timeline.to(".preloader-percentage", {
    opacity: 0,
    duration: 0.5
  }, "expandFinal+=0.5");
  
  // Make background semi-transparent
  timeline.to(".preloader", {
    backgroundColor: "rgba(0,0,0,0.5)",
    duration: 0.5
  }, "expandFinal+=0.7");
  
  // Show header elements
  timeline.to(".logo-left", {
    opacity: 1,
    y: 0,
    duration: 0.5
  }, "expandFinal+=1.2");
  
  timeline.to("#burger-menu", {
    opacity: 1,
    y: 0,
    duration: 0.5
  }, "expandFinal+=1.3");
  
  timeline.to(".nav-right", {
    opacity: 1,
    y: 0,
    duration: 0.5
  }, "expandFinal+=1.7");
  
  // Show final text content
  timeline.to(".text-container-final", {
    opacity: 1,
    duration: 0.1
  }, "expandFinal+=1.5");
  
  timeline.to(".text-line-final", {
    opacity: 1,
    duration: baseDuration,
    stagger: 0.075
  }, "expandFinal+=1.6");
  
  // Show restart button
  timeline.to(".restart-btn", {
    opacity: 1,
    pointerEvents: "auto",
    duration: 0.3
  }, "expandFinal+=1.2");
  
  // Animate title appearance
  timeline.to(".big-title", { 
    opacity: 1, 
    duration: 0.1 
  }, "expandFinal+=1.8");
  
  timeline.to(".big-title .title-line span", {
    y: "0%",
    opacity: 1,
    duration: 0.8,
    stagger: 0.2,
    ease: "power4.out"
  }, "expandFinal+=1.8");

  timeline.to(".gray-header-bar", {
    opacity: 1,
    pointerEvents: "auto",
    duration: 0.5
  }, "expandFinal+=2.0");

  return timeline;
}

/**
 * Sets up restart button animation effects
 */
function setupRestartButton() {
  const restartBtn = document.querySelector(".restart-btn");
  const additionalDots = document.querySelectorAll(".dot:nth-child(n+5)");
  const centerDot = document.querySelector(".center-dot");

  if (!restartBtn || !additionalDots.length || !centerDot) return;
  
  restartBtn.addEventListener("mouseenter", () => {
    gsap.to(additionalDots, {
      opacity: 1,
      duration: 0.3,
      stagger: 0.05
    });
    gsap.to(centerDot, {
      opacity: 1,
      scale: 1,
      duration: 0.4
    });
  });

  restartBtn.addEventListener("mouseleave", () => {
    gsap.to(additionalDots, {
      opacity: 0,
      duration: 0.3,
      stagger: 0.05
    });
    gsap.to(centerDot, {
      opacity: 0,
      scale: 0,
      duration: 0.4
    });
  });

  // Restart button functionality
  restartBtn.addEventListener("click", restartAnimation);
}

/**
 * Restarts the animation sequence
 */
function restartAnimation() {
  gsap.killTweensOf("*");
  document.querySelector(".preloader").style.backgroundColor = "#000";
  
  // Reset elements to initial state
  gsap.set(".preloader", { display: "flex", opacity: 1 });
  gsap.set(".image-container", { width: "400px", height: "500px" });
  gsap.set(".preloader-percentage", { opacity: 1, innerText: "0" });
  gsap.set(".image-wrapper", { 
    visibility: "hidden" 
  });
  
  if (supportsClipPath()) {
    gsap.set(".image-wrapper", { clipPath: "inset(100% 0 0 0)" });
  } else {
    gsap.set(".image-wrapper", { opacity: 0 });
  }
  
  gsap.set("#image-0", { visibility: "visible" });
  gsap.set(".image-wrapper img", { scale: 1.2 });
  gsap.set(".restart-btn", { opacity: 0, pointerEvents: "none" });
  gsap.set(".header", { opacity: 1 });
  gsap.set(".logo-left, .nav-right", { opacity: 0, y: 10 });
  gsap.set("#burger-menu", { opacity: 0, y: 10 });
  gsap.set(".big-title", { opacity: 0 });
  gsap.set(".big-title .title-line span", { y: "100%", opacity: 0 });
  gsap.set(".text-line", { opacity: 0, color: "#4f4f4f" });
  gsap.set(".text-line-final", { opacity: 0 });
  gsap.set(".text-container-final", { opacity: 0 });
  
  setTimeout(initAnimation, 100);
}

/**
 * Skips directly to the final animation state
 */
function skipAnimation() {
  // Kill all running animations
  gsap.killTweensOf("*");
  
  // Set final states directly
  gsap.set(".preloader", { backgroundColor: "rgba(0,0,0,0.5)" });
  gsap.set(".image-container", { width: "100vw", height: "100vh" });
  gsap.set(".preloader-percentage", { opacity: 0 });
  gsap.set(".image-wrapper", { visibility: "hidden" });
  gsap.set("#image-100", { visibility: "visible" });
  
  if (supportsClipPath()) {
    gsap.set("#image-100", { clipPath: "inset(0% 0 0 0)" });
  } else {
    gsap.set("#image-100", { opacity: 1 });
  }
  
  gsap.set("#image-100 img", { scale: 1.0 });
  gsap.set(".restart-btn", { opacity: 1, pointerEvents: "auto" });
  gsap.set(".logo-left, #burger-menu, .nav-right", { opacity: 1, y: 0 });
  gsap.set(".text-line", { opacity: 0 });
  gsap.set(".text-container-final", { opacity: 1 });
  gsap.set(".text-line-final", { opacity: 1 });
  gsap.set(".big-title", { opacity: 1 });
  gsap.set(".big-title .title-line span", { y: "0%", opacity: 1 });
  gsap.set(".gray-header-bar", { opacity: 1, pointerEvents: "auto" });
}

/**
 * Initialize all animation functionality
 */
function initAll() {
  setupGSAP();
  setTimeout(initAnimation, 100);
  setupRestartButton();
  
  // Set up skip animation button if it exists
  const skipBtn = document.querySelector(".skip-animation");
  if (skipBtn) {
    skipBtn.addEventListener("click", skipAnimation);
  }
}

// Export for use in main script
window.JustoAnimations = {
  init: initAll,
  restart: restartAnimation,
  skip: skipAnimation
};
