/**
 * 3D Home Section Interactive Animations
 */

(function($) {
    'use strict';

    // Initialize 3D effects when page loads
    $(document).ready(function() {
        if ($('.home-3d').length) {
            init3DAnimations();
            setupMouseInteractions();
            setupKeyboardInteractions();
            setupResponsiveAnimations();
        }
    });

    /**
     * Initialize main 3D animations
     */
    function init3DAnimations() {
        // Add entrance animations to elements
        setTimeout(function() {
            $('.floating-elements').addClass('animate-in');
            $('.name-3d').addClass('animate-in');
            $('.interactive-3d-elements').addClass('animate-in');
        }, 500);

        // Stagger character animations
        $('.name-3d .char').each(function(index) {
            $(this).css('animation-delay', (index * 0.1) + 's');
        });

        // Initialize particle system
        createParticleSystem();
        
        // Add ambient animations
        addAmbientAnimations();
    }

    /**
     * Setup mouse interaction effects
     */
    function setupMouseInteractions() {
        const $homeSection = $('.home-3d');
        const $container = $('.home-3d-container');

        // Mouse move parallax effect
        $homeSection.on('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width - 0.5;
            const y = (e.clientY - rect.top) / rect.height - 0.5;

            // Apply parallax to floating elements
            $('.floating-cube').each(function(index) {
                const depth = (index + 1) * 0.5;
                $(this).css('transform', 
                    `translate(${x * 20 * depth}px, ${y * 15 * depth}px) ` +
                    `rotateX(${y * 30}deg) rotateY(${x * 30}deg)`
                );
            });

            $('.floating-sphere').each(function(index) {
                const depth = (index + 1) * 0.3;
                $(this).css('transform', 
                    `translate(${x * 15 * depth}px, ${y * 12 * depth}px) ` +
                    `scale(${1 + (x + y) * 0.1})`
                );
            });

            // Apply subtle tilt to main container
            $container.css('transform', 
                `perspective(1000px) rotateX(${y * 2}deg) rotateY(${x * 2}deg)`
            );
        });

        // Reset on mouse leave
        $homeSection.on('mouseleave', function() {
            $('.floating-cube, .floating-sphere').css('transform', '');
            $container.css('transform', '');
        });

        // Character hover effects
        $('.name-3d .char').on('mouseenter', function() {
            $(this).addClass('hovered');
            
            // Add ripple effect
            const $ripple = $('<div class="char-ripple"></div>');
            $(this).append($ripple);
            
            setTimeout(function() {
                $ripple.remove();
            }, 600);
        }).on('mouseleave', function() {
            $(this).removeClass('hovered');
        });
    }

    /**
     * Setup keyboard interactions
     */
    function setupKeyboardInteractions() {
        $(document).on('keydown', function(e) {
            if (!$('.home-3d').hasClass('section-active')) return;

            // Space bar - trigger animation burst
            if (e.keyCode === 32) {
                e.preventDefault();
                triggerAnimationBurst();
            }
            
            // Enter - toggle slow motion
            if (e.keyCode === 13) {
                toggleSlowMotion();
            }
        });
    }

    /**
     * Create particle system for ambient effects
     */
    function createParticleSystem() {
        const $particleContainer = $('<div class="particle-system"></div>');
        $('.home-3d-container').append($particleContainer);

        // Generate particles
        for (let i = 0; i < 15; i++) {
            const $particle = $('<div class="particle"></div>');
            $particle.css({
                left: Math.random() * 100 + '%',
                top: Math.random() * 100 + '%',
                animationDelay: Math.random() * 5 + 's',
                animationDuration: (Math.random() * 3 + 4) + 's'
            });
            $particleContainer.append($particle);
        }
    }

    /**
     * Add ambient background animations
     */
    function addAmbientAnimations() {
        // Create gradient animation
        let gradientAngle = 135;
        setInterval(function() {
            gradientAngle = (gradientAngle + 1) % 360;
            $('.home-3d').css('background', 
                `linear-gradient(${gradientAngle}deg, #667eea 0%, #764ba2 50%, #667eea 100%)`
            );
        }, 100);

        // Pulse effect for orbit elements
        setInterval(function() {
            $('.orbit-element').each(function() {
                $(this).addClass('pulse-effect');
                setTimeout(() => {
                    $(this).removeClass('pulse-effect');
                }, 300);
            });
        }, 3000);
    }

    /**
     * Trigger animation burst effect
     */
    function triggerAnimationBurst() {
        $('.home-3d').addClass('burst-mode');
        
        // Create burst particles
        for (let i = 0; i < 10; i++) {
            const $burstParticle = $('<div class="burst-particle"></div>');
            $burstParticle.css({
                left: '50%',
                top: '50%',
                '--angle': Math.random() * 360 + 'deg',
                '--distance': Math.random() * 200 + 100 + 'px'
            });
            $('.home-3d-container').append($burstParticle);
            
            setTimeout(function() {
                $burstParticle.remove();
            }, 1000);
        }
        
        setTimeout(function() {
            $('.home-3d').removeClass('burst-mode');
        }, 1000);
    }

    /**
     * Toggle slow motion effect
     */
    function toggleSlowMotion() {
        $('.home-3d').toggleClass('slow-motion');
    }

    /**
     * Setup responsive animations
     */
    function setupResponsiveAnimations() {
        $(window).on('resize', function() {
            // Adjust animations based on screen size
            const isMobile = window.innerWidth <= 768;
            const isTablet = window.innerWidth <= 1024;
            
            if (isMobile) {
                // Reduce animation intensity on mobile
                $('.floating-elements').addClass('mobile-optimized');
                $('.interactive-3d-elements').addClass('mobile-optimized');
            } else {
                $('.floating-elements').removeClass('mobile-optimized');
                $('.interactive-3d-elements').removeClass('mobile-optimized');
            }
        });
    }

    /**
     * Performance optimization: Pause animations when not visible
     */
    function setupVisibilityOptimization() {
        if ('IntersectionObserver' in window) {
            const observer = new IntersectionObserver(function(entries) {
                entries.forEach(function(entry) {
                    if (entry.isIntersecting) {
                        $(entry.target).removeClass('paused');
                    } else {
                        $(entry.target).addClass('paused');
                    }
                });
            }, {
                threshold: 0.1
            });

            if ($('.home-3d').length) {
                observer.observe($('.home-3d')[0]);
            }
        }
    }

    // Initialize visibility optimization
    setupVisibilityOptimization();

})(jQuery);