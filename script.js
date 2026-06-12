document.addEventListener('DOMContentLoaded', () => {
  // Navigation
  const navbar = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) navbar.classList.add('scrolled');
    else navbar.classList.remove('scrolled');
  });

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
  });

  // Typing Effect
  const phrases = ["Enhance your reality.", "Upgrade your biology.", "Join the collective.", "Embrace the singularity."];
  const typingText = document.getElementById('typingText');
  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function typeEffect() {
    const currentPhrase = phrases[phraseIndex];
    
    if (isDeleting) {
      typingText.textContent = currentPhrase.substring(0, charIndex - 1);
      charIndex--;
    } else {
      typingText.textContent = currentPhrase.substring(0, charIndex + 1);
      charIndex++;
    }

    let typeSpeed = isDeleting ? 50 : 100;

    if (!isDeleting && charIndex === currentPhrase.length) {
      typeSpeed = 2000;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      typeSpeed = 500;
    }

    setTimeout(typeEffect, typeSpeed);
  }
  
  // Add cursor
  const cursor = document.createElement('span');
  cursor.className = 'typing-cursor';
  document.querySelector('.hero-subtitle').appendChild(cursor);
  
  setTimeout(typeEffect, 1000);

  // Stats Counter Animation
  const stats = document.querySelectorAll('.stat-num, .stat-counter');
  let animatedStats = false;

  function animateStats() {
    stats.forEach(stat => {
      const target = parseFloat(stat.getAttribute('data-target'));
      const duration = 2000;
      const step = target / (duration / 16);
      let current = 0;

      const updateCounter = () => {
        current += step;
        if (current < target) {
          stat.textContent = current.toFixed(target % 1 !== 0 ? 1 : 0);
          requestAnimationFrame(updateCounter);
        } else {
          stat.textContent = target;
        }
      };
      updateCounter();
    });
  }

  // Progress Bars
  function animateProgressBars() {
    document.querySelectorAll('.progress-bar, .stat-bar-fill').forEach(bar => {
      bar.style.width = bar.getAttribute('data-width') + '%';
    });
  }

  // Intersection Observer for Animations
  const observerOptions = { threshold: 0.2 };
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        if (entry.target.classList.contains('hero-stats') && !animatedStats) {
          animateStats();
          animatedStats = true;
        }
        if (entry.target.classList.contains('features-grid') || entry.target.classList.contains('stats-grid')) {
          animateProgressBars();
        }
      }
    });
  }, observerOptions);

  observer.observe(document.querySelector('.hero-stats'));
  observer.observe(document.querySelector('.features-grid'));
  observer.observe(document.querySelector('.stats-grid'));

  // Random Glitch Effect
  const glitchOverlay = document.getElementById('glitchOverlay');
  function triggerGlitch() {
    glitchOverlay.classList.add('active');
    setTimeout(() => {
      glitchOverlay.classList.remove('active');
    }, 150 + Math.random() * 200);
    
    setTimeout(triggerGlitch, 5000 + Math.random() * 15000);
  }
  setTimeout(triggerGlitch, 3000);

  // Data Stream Effect
  const streamContainer = document.getElementById('dataStream');
  if (streamContainer) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$+-*/=%""\'#&_(),.;:?!\\|{}<>[]^~';
    
    setInterval(() => {
      let line = '';
      for (let i = 0; i < 20; i++) {
        line += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      
      const el = document.createElement('div');
      el.textContent = line;
      streamContainer.appendChild(el);
      
      if (streamContainer.children.length > 15) {
        streamContainer.removeChild(streamContainer.firstChild);
      }
    }, 100);
  }

  // Form Submission
  const submitBtn = document.getElementById('submitBtn');
  const toast = document.getElementById('toast');
  const toastMsg = document.getElementById('toastMsg');
  
  if (submitBtn) {
    submitBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const name = document.getElementById('nameInput').value;
      const email = document.getElementById('emailInput').value;
      
      if (!name || !email) {
        toastMsg.textContent = 'ERROR: MISSING DATA. PLEASE COMPLETE ALL FIELDS.';
        toastMsg.style.color = 'var(--magenta)';
        toast.style.borderColor = 'var(--magenta)';
      } else {
        toastMsg.textContent = `PROTOCOL INITIATED FOR [${name.toUpperCase()}]. STAND BY.`;
        toastMsg.style.color = 'var(--cyan)';
        toast.style.borderColor = 'var(--cyan)';
        document.getElementById('nameInput').value = '';
        document.getElementById('emailInput').value = '';
      }
      
      toast.classList.add('show');
      setTimeout(() => {
        toast.classList.remove('show');
      }, 4000);
    });
  }

  // Particle Canvas Background
  const canvas = document.getElementById('particleCanvas');
  const ctx = canvas.getContext('2d');
  
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  
  const particlesArray = [];
  
  class Particle {
    constructor() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = Math.random() * 2 + 0.1;
      this.speedX = Math.random() * 1 - 0.5;
      this.speedY = Math.random() * 1 - 0.5;
    }
    update() {
      this.x += this.speedX;
      this.y += this.speedY;
      
      if (this.size > 0.2) this.size -= 0.01;
      
      if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
      if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
    }
    draw() {
      ctx.fillStyle = 'rgba(0, 243, 255, 0.5)';
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
    }
  }
  
  function initParticles() {
    for (let i = 0; i < 100; i++) {
      particlesArray.push(new Particle());
    }
  }
  
  function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < particlesArray.length; i++) {
      particlesArray[i].update();
      particlesArray[i].draw();
      
      // Connect particles
      for (let j = i; j < particlesArray.length; j++) {
        const dx = particlesArray[i].x - particlesArray[j].x;
        const dy = particlesArray[i].y - particlesArray[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 100) {
          ctx.beginPath();
          ctx.strokeStyle = `rgba(0, 243, 255, ${0.1 - distance/1000})`;
          ctx.lineWidth = 0.5;
          ctx.moveTo(particlesArray[i].x, particlesArray[i].y);
          ctx.lineTo(particlesArray[j].x, particlesArray[j].y);
          ctx.stroke();
        }
      }
    }
    requestAnimationFrame(animateParticles);
  }
  
  initParticles();
  animateParticles();
  
  window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });

  // 3D Tilt Effect
  const tiltElements = document.querySelectorAll('.feature-card, .about-visual, .timeline-card');
  
  tiltElements.forEach(el => {
    el.classList.add('tilt-element');
    
    el.addEventListener('mousemove', (e) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = ((y - centerY) / centerY) * -10;
      const rotateY = ((x - centerX) / centerX) * 10;
      
      el.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
      el.style.transition = 'none';
      el.style.zIndex = '10';
    });
    
    el.addEventListener('mouseleave', () => {
      el.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
      el.style.transition = 'transform 0.5s ease';
      el.style.zIndex = '1';
    });
  });

  // Hero Parallax
  const heroGrid = document.querySelector('.hero-grid');
  const scene3d = document.getElementById('scene3d');
  
  document.addEventListener('mousemove', (e) => {
    const x = (window.innerWidth / 2 - e.pageX) / 50;
    const y = (window.innerHeight / 2 - e.pageY) / 50;
    
    if (heroGrid) {
      heroGrid.style.transform = `perspective(500px) rotateX(60deg) translateY(-100px) translateZ(-200px) translateX(${x}px) translateY(${y}px)`;
    }
    
    if (scene3d) {
      scene3d.style.transform = `translate3d(${x * 2}px, ${y * 2}px, 0)`;
    }
  });

  // Scroll Reveal Animations
  const revealElements = document.querySelectorAll('.section-header, .about-block, .feature-card, .stat-card, .timeline-card, .about-visual, .cta-content');
  
  revealElements.forEach((el, index) => {
    if (!el.classList.contains('reveal')) {
      el.classList.add('reveal');
      
      if (el.classList.contains('timeline-card')) {
        if (el.parentElement.classList.contains('left')) el.classList.add('reveal-left');
        else el.classList.add('reveal-right');
      } else if (el.classList.contains('about-visual')) {
        el.classList.add('reveal-scale');
      }
      
      if (el.classList.contains('feature-card') || el.classList.contains('stat-card') || el.classList.contains('about-block')) {
         const delayMatch = el.getAttribute('data-delay');
         if (delayMatch) {
            el.style.transitionDelay = delayMatch + 'ms';
         } else {
            const delay = (index % 4) * 100;
            el.style.transitionDelay = delay + 'ms';
         }
      }
    }
  });

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: "0px 0px -50px 0px" });

  revealElements.forEach(el => revealObserver.observe(el));

  // Custom Cursor
  const cursorDot = document.getElementById('cursorDot');
  const cursorRing = document.getElementById('cursorRing');
  
  if (cursorDot && cursorRing) {
    document.addEventListener('mousemove', (e) => {
      cursorDot.style.left = e.clientX + 'px';
      cursorDot.style.top = e.clientY + 'px';
      
      // Delay ring slightly for trailing effect
      setTimeout(() => {
        cursorRing.style.left = e.clientX + 'px';
        cursorRing.style.top = e.clientY + 'px';
      }, 50);
    });

    // Hover effect on interactable elements
    const interactables = document.querySelectorAll('a, button, input, .feature-card, .stat-card, .timeline-card, .nav-logo');
    interactables.forEach(el => {
      el.addEventListener('mouseenter', () => {
        cursorDot.classList.add('hover');
        cursorRing.classList.add('hover');
      });
      el.addEventListener('mouseleave', () => {
        cursorDot.classList.remove('hover');
        cursorRing.classList.remove('hover');
      });
    });
  }

  // Scroll Progress Bar
  const scrollProgress = document.getElementById('scrollProgress');
  window.addEventListener('scroll', () => {
    if (scrollProgress) {
      const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (winScroll / height) * 100;
      scrollProgress.style.width = scrolled + '%';
    }
  });

  // Magnetic Buttons
  const magneticBtns = document.querySelectorAll('.btn-primary, .btn-secondary');
  magneticBtns.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
    });
    btn.addEventListener('mouseleave', () => {
      btn.style.transform = `translate(0px, 0px)`;
    });
  });

  // Text Scramble on Hover for Nav Links
  const scrambleChars = '!<>-_\\\\/[]{}—=+*^?#________';
  const navItems = document.querySelectorAll('.nav-link');
  
  navItems.forEach(link => {
    let interval = null;
    link.addEventListener('mouseenter', (e) => {
      let iteration = 0;
      const originalText = link.dataset.text || e.target.innerText;
      if (!link.dataset.text) link.dataset.text = originalText;
      
      clearInterval(interval);
      interval = setInterval(() => {
        e.target.innerText = originalText.split('').map((letter, index) => {
          if (index < iteration) {
            return originalText[index];
          }
          return scrambleChars[Math.floor(Math.random() * scrambleChars.length)];
        }).join('');
        
        if (iteration >= originalText.length) {
          clearInterval(interval);
        }
        iteration += 1 / 3;
      }, 30);
    });
  });
});
