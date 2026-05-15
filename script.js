document.addEventListener('DOMContentLoaded', () => {
  // ─── SCROLL PROGRESS BAR ───
  const scrollProgress = document.querySelector('.scroll-progress');
  if (scrollProgress) {
    window.addEventListener('scroll', () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;
      scrollProgress.style.width = scrollPercent + '%';
    });
  }

  // ─── FLOATING HEARTS IN INTRO ───
  const heartsBg = document.querySelector('.hearts-bg');
  if (heartsBg) {
    for (let i = 0; i < 30; i++) {
      const heart = document.createElement('span');
      heart.classList.add('floating-heart');
      heart.textContent = ['💕', '💗', '💖', '♥', '💝', '✨', '🌸'][Math.floor(Math.random() * 7)];
      heart.style.left = Math.random() * 100 + '%';
      heart.style.animationDelay = Math.random() * 6 + 's';
      heart.style.animationDuration = (4 + Math.random() * 4) + 's';
      heart.style.fontSize = (1 + Math.random() * 1.5) + 'rem';
      heartsBg.appendChild(heart);
    }
  }

  // ─── BLUR BACKGROUNDS FOR VIDEOS ───
  const blurVideoObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const blurVid = entry.target;
      if (entry.isIntersecting) blurVid.play().catch(() => {});
      else blurVid.pause();
    });
  }, { threshold: 0.1 });

  function addBlurVideoBG(container) {
    const mainVideo = container.querySelector('video:not(.blur-video-bg)');
    if (!mainVideo) return;
    const blur = document.createElement('video');
    blur.src = mainVideo.src;
    blur.className = 'blur-video-bg';
    blur.muted = true;
    blur.autoplay = true;
    blur.loop = true;
    blur.playsInline = true;
    blur.setAttribute('playsinline', '');
    container.insertBefore(blur, container.firstChild);
    blurVideoObserver.observe(blur);
  }

  document.querySelectorAll('.carousel-card, .video-cinema, .video-pair-card, .video-reveal').forEach(addBlurVideoBG);

  document.querySelectorAll('.video-strip').forEach(strip => {
    const mainVideo = strip.querySelector('video');
    if (!mainVideo) return;
    const wrapper = document.createElement('div');
    wrapper.className = 'strip-video-wrap';
    strip.insertBefore(wrapper, mainVideo);
    wrapper.appendChild(mainVideo);
    addBlurVideoBG(wrapper);
  });

  // ─── BLUR BACKGROUNDS FOR FLIP-CARD IMAGES ───
  document.querySelectorAll('.flip-card-back').forEach(back => {
    const img = back.querySelector('img');
    if (!img) return;
    const wrapper = document.createElement('div');
    wrapper.className = 'flip-img-wrap';
    back.insertBefore(wrapper, img);
    wrapper.appendChild(img);
    const blurDiv = document.createElement('div');
    blurDiv.className = 'blur-bg';
    const blurImg = document.createElement('img');
    blurImg.src = img.src;
    blurImg.alt = '';
    blurDiv.appendChild(blurImg);
    wrapper.insertBefore(blurDiv, img);
    img.classList.add('main-img');
  });

  // ─── MUSIC PLAYER ───
  const audio = document.getElementById('bg-music') || document.getElementById('bgAudio');
  const musicPlayer = document.querySelector('.music-player');
  const musicIcon = musicPlayer?.querySelector('.music-icon');
  let musicStarted = false;

  function startMusic() {
    if (!musicStarted && audio) {
      audio.volume = 0.5;
      audio.play().catch(() => {});
      musicStarted = true;
      if (musicPlayer) musicPlayer.classList.remove('paused');
    }
  }

  // Only attach secondary handler if Budday's #musicPlayer inline handler isn't present
  if (musicPlayer && !document.getElementById('musicPlayer')) {
    musicPlayer.addEventListener('click', () => {
      if (audio.paused) {
        audio.play();
        musicPlayer.classList.remove('paused');
        if (musicIcon) musicIcon.textContent = '🎵';
      } else {
        audio.pause();
        musicPlayer.classList.add('paused');
        if (musicIcon) musicIcon.textContent = '🔇';
      }
    });
  }

  // ─── ENTER BUTTON ───
  const enterBtn = document.querySelector('.enter-btn');
  if (enterBtn) {
    enterBtn.addEventListener('click', () => {
      startMusic();
      const nextSection = document.getElementById('envelope-section');
      if (nextSection) {
        nextSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }

  // ─── SCROLL ANIMATIONS ───
  const observerOptions = { threshold: 0.15, rootMargin: '0px 0px -50px 0px' };
  const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, observerOptions);

  document.querySelectorAll('.animate-on-scroll').forEach(el => {
    scrollObserver.observe(el);
  });

  // ─── ENVELOPE ───
  const envelope = document.querySelector('.envelope');
  const letterContent = document.querySelector('.letter-content');
  if (envelope) {
    envelope.addEventListener('click', () => {
      envelope.classList.toggle('opened');
      setTimeout(() => {
        if (letterContent) letterContent.classList.toggle('show');
      }, 800);
    });
  }

  // ─── FLIP CARDS ───
  document.querySelectorAll('.flip-card').forEach(card => {
    card.addEventListener('click', () => {
      card.classList.toggle('flipped');
    });
  });

  // ─── TYPEWRITER EFFECT ───
  const typewriterElements = document.querySelectorAll('.typewriter-text');
  const typewriterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.dataset.typed) {
        entry.target.dataset.typed = 'true';
        const fullText = entry.target.dataset.text;
        entry.target.textContent = '';
        const cursor = document.createElement('span');
        cursor.classList.add('typewriter-cursor');
        entry.target.parentElement.appendChild(cursor);
        let i = 0;
        const typeInterval = setInterval(() => {
          if (i < fullText.length) {
            entry.target.textContent += fullText.charAt(i);
            i++;
          } else {
            clearInterval(typeInterval);
            setTimeout(() => cursor.style.display = 'none', 2000);
          }
        }, 40);
      }
    });
  }, { threshold: 0.3 });
  typewriterElements.forEach(el => typewriterObserver.observe(el));

  // ─── SCRATCH CARDS ───
  document.querySelectorAll('.scratch-card canvas').forEach(canvas => {
    const ctx = canvas.getContext('2d');
    canvas.width = canvas.parentElement.offsetWidth;
    canvas.height = canvas.parentElement.offsetHeight;

    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, '#2d0a3e');
    gradient.addColorStop(0.5, '#1a0a2e');
    gradient.addColorStop(1, '#0f0520');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#ffd700';
    ctx.font = '24px "Dancing Script", cursive';
    ctx.textAlign = 'center';
    ctx.fillText('✨ Scratch Me ✨', canvas.width / 2, canvas.height / 2 - 10);
    ctx.font = '16px "Poppins", sans-serif';
    ctx.fillStyle = '#b8a9c9';
    ctx.fillText("What's hidden here?", canvas.width / 2, canvas.height / 2 + 20);

    let isDrawing = false;

    function getPos(e) {
      const rect = canvas.getBoundingClientRect();
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      return { x: clientX - rect.left, y: clientY - rect.top };
    }

    function scratch(e) {
      if (!isDrawing) return;
      e.preventDefault();
      const pos = getPos(e);
      ctx.globalCompositeOperation = 'destination-out';
      ctx.beginPath();
      ctx.arc(pos.x, pos.y, 25, 0, Math.PI * 2);
      ctx.fill();
    }

    canvas.addEventListener('mousedown', (e) => { isDrawing = true; scratch(e); });
    canvas.addEventListener('mousemove', scratch);
    canvas.addEventListener('mouseup', () => isDrawing = false);
    canvas.addEventListener('mouseleave', () => isDrawing = false);
    canvas.addEventListener('touchstart', (e) => { isDrawing = true; scratch(e); }, { passive: false });
    canvas.addEventListener('touchmove', scratch, { passive: false });
    canvas.addEventListener('touchend', () => isDrawing = false);
  });

  // ─── VIDEO PLAY ON VISIBILITY ───
  const videoObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const video = entry.target;
      if (entry.isIntersecting) {
        video.play().catch(() => {});
      } else {
        video.pause();
      }
    });
  }, { threshold: 0.5 });

  document.querySelectorAll('.auto-play-video').forEach(video => {
    videoObserver.observe(video);
  });

  // ─── VIDEO CINEMA PLAY BUTTON ───
  document.querySelectorAll('.video-cinema').forEach(cinema => {
    const video = cinema.querySelector('video:not(.blur-video-bg)');
    const playBtn = cinema.querySelector('.play-btn-big');
    cinema.addEventListener('click', () => {
      if (video.paused) {
        video.play();
        video.muted = false;
        if (playBtn) playBtn.style.display = 'none';
      } else {
        video.pause();
        if (playBtn) playBtn.style.display = 'flex';
      }
    });
  });

  // ─── VIDEO PAIR CLICK ───
  document.querySelectorAll('.video-pair-card').forEach(card => {
    card.addEventListener('click', () => {
      const video = card.querySelector('video:not(.blur-video-bg)');
      if (video.paused) {
        video.play();
        video.muted = false;
      } else {
        video.pause();
      }
    });
  });

  // ─── VIDEO REVEAL CLICK ───
  document.querySelectorAll('.video-reveal').forEach(reveal => {
    reveal.addEventListener('click', () => {
      const video = reveal.querySelector('video:not(.blur-video-bg)');
      if (video.paused) {
        video.play();
        video.muted = false;
        reveal.classList.add('playing');
      } else {
        video.pause();
        reveal.classList.remove('playing');
      }
    });
  });

  // ─── PHOTO SLIDER ───
  const slides = document.querySelectorAll('.slide');
  const dots = document.querySelectorAll('.slider-dots .dot');
  let currentSlide = 0;
  let sliderInterval;

  function goToSlide(index) {
    slides.forEach(s => s.classList.remove('active'));
    dots.forEach(d => d.classList.remove('active'));
    currentSlide = index;
    if (slides[currentSlide]) slides[currentSlide].classList.add('active');
    if (dots[currentSlide]) dots[currentSlide].classList.add('active');
  }

  function nextSlide() {
    goToSlide((currentSlide + 1) % slides.length);
  }

  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
      goToSlide(i);
      clearInterval(sliderInterval);
      sliderInterval = setInterval(nextSlide, 5000);
    });
  });

  if (slides.length > 0) {
    sliderInterval = setInterval(nextSlide, 5000);
  }

  // ─── STARS IN FINAL SECTION ───
  const starsContainer = document.querySelector('.final-stars');
  if (starsContainer) {
    for (let i = 0; i < 80; i++) {
      const star = document.createElement('div');
      star.classList.add('star');
      star.style.left = Math.random() * 100 + '%';
      star.style.top = Math.random() * 100 + '%';
      star.style.setProperty('--dur', (2 + Math.random() * 4) + 's');
      star.style.setProperty('--delay', Math.random() * 3 + 's');
      star.style.width = (1 + Math.random() * 3) + 'px';
      star.style.height = star.style.width;
      starsContainer.appendChild(star);
    }
  }

  // ─── LIGHTBOX ───
  const lightbox = document.getElementById('lightbox');
  const lightboxContent = document.getElementById('lightboxContent');
  const lightboxClose = document.getElementById('lightboxClose');

  document.querySelectorAll('.gallery-card, .gallery-hero').forEach(item => {
    item.addEventListener('click', () => {
      const img = item.querySelector('.main-img');
      if (lightbox && lightboxContent && img) {
        lightboxContent.innerHTML = `<img src="${img.src}" alt="Photo">`;
        lightbox.classList.add('active');
      }
    });
  });

  if (lightbox) {
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox || e.target === lightboxClose) {
        lightbox.classList.remove('active');
      }
    });
  }

  if (lightboxClose) {
    lightboxClose.addEventListener('click', () => lightbox.classList.remove('active'));
  }

  // ─── CAROUSEL DRAG SCROLL ───
  const carouselWrapper = document.querySelector('.carousel-wrapper');
  if (carouselWrapper) {
    let isDrag = false, startX, scrollLeft;
    carouselWrapper.addEventListener('mousedown', (e) => {
      isDrag = true;
      startX = e.pageX - carouselWrapper.offsetLeft;
      scrollLeft = carouselWrapper.scrollLeft;
    });
    carouselWrapper.addEventListener('mouseleave', () => isDrag = false);
    carouselWrapper.addEventListener('mouseup', () => isDrag = false);
    carouselWrapper.addEventListener('mousemove', (e) => {
      if (!isDrag) return;
      e.preventDefault();
      const x = e.pageX - carouselWrapper.offsetLeft;
      const walk = (x - startX) * 2;
      carouselWrapper.scrollLeft = scrollLeft - walk;
    });
  }

  // ─── VIDEO STRIP CLICK ───
  document.querySelectorAll('.video-strip video:not(.blur-video-bg)').forEach(video => {
    video.addEventListener('click', () => {
      if (video.paused) { video.play(); video.muted = false; }
      else { video.pause(); }
    });
  });

  // ─── CAROUSEL VIDEO CLICK ───
  document.querySelectorAll('.carousel-card video:not(.blur-video-bg)').forEach(video => {
    video.addEventListener('click', () => {
      if (video.paused) { video.play(); video.muted = false; }
      else { video.pause(); }
    });
  });

  // ─── RESIZE SCRATCH CANVASES ───
  window.addEventListener('resize', () => {
    document.querySelectorAll('.scratch-card canvas').forEach(canvas => {
      const parent = canvas.parentElement;
      canvas.width = parent.offsetWidth;
      canvas.height = parent.offsetHeight;
      const ctx = canvas.getContext('2d');
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      gradient.addColorStop(0, '#2d0a3e');
      gradient.addColorStop(0.5, '#1a0a2e');
      gradient.addColorStop(1, '#0f0520');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#ffd700';
      ctx.font = '24px "Dancing Script", cursive';
      ctx.textAlign = 'center';
      ctx.fillText('✨ Scratch Me ✨', canvas.width / 2, canvas.height / 2 - 10);
      ctx.font = '16px "Poppins", sans-serif';
      ctx.fillStyle = '#b8a9c9';
      ctx.fillText("What's hidden here?", canvas.width / 2, canvas.height / 2 + 20);
    });
  });

  // ─── COLLECTION HUB MODALS ───
  function initScratchCanvases(container) {
    container.querySelectorAll('.scratch-card canvas').forEach(canvas => {
      const parent = canvas.parentElement;
      canvas.width = parent.offsetWidth;
      canvas.height = parent.offsetHeight;
      const ctx = canvas.getContext('2d');
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      gradient.addColorStop(0, '#2d0a3e');
      gradient.addColorStop(0.5, '#1a0a2e');
      gradient.addColorStop(1, '#0f0520');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#ffd700';
      ctx.font = '24px "Dancing Script", cursive';
      ctx.textAlign = 'center';
      ctx.fillText('✨ Scratch Me ✨', canvas.width / 2, canvas.height / 2 - 10);
      ctx.font = '16px "Poppins", sans-serif';
      ctx.fillStyle = '#b8a9c9';
      ctx.fillText("What's hidden here?", canvas.width / 2, canvas.height / 2 + 20);

      let isDrawing = false;
      function getPos(e) {
        const rect = canvas.getBoundingClientRect();
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const clientY = e.touches ? e.touches[0].clientY : e.clientY;
        return { x: clientX - rect.left, y: clientY - rect.top };
      }
      function scratch(e) {
        if (!isDrawing) return;
        e.preventDefault();
        const pos = getPos(e);
        ctx.globalCompositeOperation = 'destination-out';
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, 25, 0, Math.PI * 2);
        ctx.fill();
      }
      canvas.addEventListener('mousedown', (e) => { isDrawing = true; scratch(e); });
      canvas.addEventListener('mousemove', scratch);
      canvas.addEventListener('mouseup', () => isDrawing = false);
      canvas.addEventListener('mouseleave', () => isDrawing = false);
      canvas.addEventListener('touchstart', (e) => { isDrawing = true; scratch(e); }, { passive: false });
      canvas.addEventListener('touchmove', scratch, { passive: false });
      canvas.addEventListener('touchend', () => isDrawing = false);
    });
  }

  function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (!modal) return;
    modal.classList.add('active');
    document.body.classList.add('modal-open');

    requestAnimationFrame(() => {
      modal.querySelector('.modal-backdrop').style.opacity = '1';
      modal.querySelector('.modal-content').style.transform = 'translateY(0)';
    });

    if (modalId === 'modal-scratch') {
      setTimeout(() => initScratchCanvases(modal), 300);
    }

    modal.querySelectorAll('.carousel-card, .video-cinema, .video-pair-card, .video-reveal').forEach(container => {
      if (!container.querySelector('.blur-video-bg')) {
        addBlurVideoBG(container);
      }
    });
  }

  function closeModal(modal) {
    if (!modal) return;
    const content = modal.querySelector('.modal-content');
    const backdrop = modal.querySelector('.modal-backdrop');
    content.style.transform = 'translateY(100%)';
    backdrop.style.opacity = '0';
    
    modal.querySelectorAll('video').forEach(v => { v.pause(); v.currentTime = 0; });
    
    setTimeout(() => {
      modal.classList.remove('active');
      document.body.classList.remove('modal-open');
    }, 500);
  }

  document.querySelectorAll('.collection-card').forEach(card => {
    card.addEventListener('click', () => {
      const modalId = card.dataset.modal;
      openModal(modalId);
    });
  });

  document.querySelectorAll('.modal-close-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const modal = btn.closest('.collection-modal');
      closeModal(modal);
    });
  });

  document.querySelectorAll('.modal-backdrop').forEach(backdrop => {
    backdrop.addEventListener('click', () => {
      const modal = backdrop.closest('.collection-modal');
      closeModal(modal);
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      const activeModal = document.querySelector('.collection-modal.active');
      if (activeModal) closeModal(activeModal);
    }
  });

  document.querySelectorAll('.collection-modal .video-strip video:not(.blur-video-bg)').forEach(video => {
    video.addEventListener('click', () => {
      if (video.paused) { video.play(); video.muted = false; }
      else { video.pause(); }
    });
  });

  document.querySelectorAll('.collection-modal .carousel-card video:not(.blur-video-bg)').forEach(video => {
    video.addEventListener('click', () => {
      if (video.paused) { video.play(); video.muted = false; }
      else { video.pause(); }
    });
  });

  document.querySelectorAll('.collection-modal .video-cinema').forEach(cinema => {
    cinema.addEventListener('click', () => {
      const video = cinema.querySelector('video:not(.blur-video-bg)');
      const playBtn = cinema.querySelector('.play-btn-big');
      if (!video) return;
      if (video.paused) {
        video.play();
        video.muted = false;
        if (playBtn) playBtn.style.display = 'none';
      } else {
        video.pause();
        if (playBtn) playBtn.style.display = 'flex';
      }
    });
  });

  document.querySelectorAll('.collection-modal .video-pair-card').forEach(card => {
    card.addEventListener('click', () => {
      const video = card.querySelector('video:not(.blur-video-bg)');
      if (video.paused) { video.play(); video.muted = false; }
      else { video.pause(); }
    });
  });

  document.querySelectorAll('.collection-modal .video-reveal').forEach(reveal => {
    reveal.addEventListener('click', () => {
      const video = reveal.querySelector('video:not(.blur-video-bg)');
      const prompt = reveal.querySelector('.reveal-prompt');
      if (!video) return;
      if (video.paused) {
        video.play(); video.muted = false;
        if (prompt) prompt.style.opacity = '0';
      } else {
        video.pause();
        if (prompt) prompt.style.opacity = '1';
      }
    });
  });

  document.querySelectorAll('.collection-modal .flip-card').forEach(card => {
    card.addEventListener('click', () => {
      card.classList.toggle('flipped');
    });
  });
});
