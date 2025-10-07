    const nav = document.querySelector('.navbar-custom');
    window.addEventListener('scroll', () => {
      if (window.scrollY > 10) nav.classList.add('scrolled');
      else nav.classList.remove('scrolled');
    });
    function revealAllNow() {
      document.querySelectorAll('.reveal').forEach(el => el.classList.add('visible'));
    }

    document.addEventListener('DOMContentLoaded', () => {
      setTimeout(() => {
        if ('IntersectionObserver' in window) {
          const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
              if (entry.isIntersecting) entry.target.classList.add('visible');
            });
          }, { threshold: 0.15 });
          document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
        } else {
          revealAllNow();
        }
        // safety fallback
        setTimeout(revealAllNow, 600);
      }, 80);
    });

    function activateEduSpotlight(container) {
      if (!container) return;
      const onMove = (e) => {
        const rect = container.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        container.style.setProperty('--x', x + 'px');
        container.style.setProperty('--y', y + 'px');
      };
      const onEnter = (e) => {
        container.classList.add('hovered');
        onMove(e);
      };
      const onLeave = () => {
        container.classList.remove('hovered');
        // move offscreen to hide quickly
        container.style.setProperty('--x', '-9999px');
        container.style.setProperty('--y', '-9999px');
      };

      container.addEventListener('mousemove', onMove);
      container.addEventListener('mouseenter', onEnter);
      container.addEventListener('mouseleave', onLeave);
      // touch fallback: show spotlight near center on touchstart
      container.addEventListener('touchstart', (e) => {
        const rect = container.getBoundingClientRect();
        container.style.setProperty('--x', (rect.width/2) + 'px');
        container.style.setProperty('--y', (rect.height/2) + 'px');
        container.classList.add('hovered');
      }, {passive:true});
      container.addEventListener('touchend', onLeave);
    }

    document.addEventListener('DOMContentLoaded', () => {
      document.querySelectorAll('.edu-card').forEach(card => activateEduSpotlight(card));
    });