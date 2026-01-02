/**
 * Particles Animation for Home Section
 * Creates floating particles with smooth animation
 */

class ParticlesAnimation {
  constructor(container) {
    this.container = container;
    this.particles = [];
    this.particleCount = 50;
    this.init();
  }

  init() {
    this.createParticles();
    this.startAnimation();
  }

  createParticles() {
    for (let i = 0; i < this.particleCount; i++) {
      this.createParticle();
    }
  }

  createParticle() {
    const particle = document.createElement('div');
    particle.className = 'particle';

    // Random size classes
    const sizes = ['small', 'medium', 'large'];
    const randomSize = sizes[Math.floor(Math.random() * sizes.length)];
    particle.classList.add(randomSize);

    // Random horizontal position
    const randomX = Math.random() * 100;
    particle.style.left = randomX + '%';

    // Random animation delay for more natural movement
    const randomDelay = Math.random() * 15;
    particle.style.animationDelay = `-${randomDelay}s`;

    // Random animation duration for variety
    const randomDuration = 12 + Math.random() * 8; // Between 12-20 seconds
    particle.style.animationDuration = `${randomDuration}s`;

    this.container.appendChild(particle);
    this.particles.push(particle);
  }

  startAnimation() {
    // Animation is handled by CSS, this method can be used for additional control
    console.log('Particles animation started');
  }

  destroy() {
    this.particles.forEach(particle => {
      if (particle.parentNode) {
        particle.parentNode.removeChild(particle);
      }
    });
    this.particles = [];
  }

  // Method to pause/resume animation
  pauseAnimation() {
    this.particles.forEach(particle => {
      particle.style.animationPlayState = 'paused';
    });
  }

  resumeAnimation() {
    this.particles.forEach(particle => {
      particle.style.animationPlayState = 'running';
    });
  }
}

// Initialize particles when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  const particlesContainer = document.querySelector('.particles-container');
  if (particlesContainer) {
    window.particlesAnimation = new ParticlesAnimation(particlesContainer);
  }
});

// Handle visibility change to pause/resume animation for performance
document.addEventListener('visibilitychange', function() {
  if (window.particlesAnimation) {
    if (document.hidden) {
      window.particlesAnimation.pauseAnimation();
    } else {
      window.particlesAnimation.resumeAnimation();
    }
  }
});