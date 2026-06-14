// Comportamentos Globais e Efeitos Visuais Premium — EcoAds V2

document.addEventListener('DOMContentLoaded', () => {
  // ==========================================
  // 0. PRELOADER INTEGRADO DE ALTAS ESTRUTURAS (ANÉIS DA ESCURIDÃO)
  // ==========================================
  const preloaderCanvas = document.getElementById('preloader-canvas');
  if (preloaderCanvas) {
    const pCtx = preloaderCanvas.getContext('2d');
    let pWidth = preloaderCanvas.width = window.innerWidth;
    let pHeight = preloaderCanvas.height = window.innerHeight;
    
    const handlePreloaderResize = () => {
      if (preloaderCanvas && preloaderCanvas.parentNode) {
        pWidth = preloaderCanvas.width = window.innerWidth;
        pHeight = preloaderCanvas.height = window.innerHeight;
      }
    };
    window.addEventListener('resize', handlePreloaderResize);

    let pTime = 0;
    let pAnimationId;

    const pRender = () => {
      pTime += 0.003; // Mesma velocidade do hero canvas
      pCtx.clearRect(0, 0, pWidth, pHeight);

      const pCenterX = pWidth / 2;
      const pCenterY = pHeight / 2;

      const maxRadius = Math.hypot(pCenterX, pCenterY);
      const ringDist = 10; // Mesmo espaçamento denso do hero
      const numRings = Math.ceil(maxRadius / ringDist);

      // Expansão suave dos anéis para fora
      const offset = (pTime * 200) % ringDist;

      // Gradiente radial centrado no logo para apagar suavemente as bordas
      const radGrad = pCtx.createRadialGradient(pCenterX, pCenterY, 50, pCenterX, pCenterY, Math.min(pWidth, pHeight) * 0.45);
      radGrad.addColorStop(0, 'rgba(0, 255, 102, 0.45)');
      radGrad.addColorStop(0.35, 'rgba(0, 229, 255, 0.15)');
      radGrad.addColorStop(1, 'transparent');

      pCtx.strokeStyle = radGrad;
      pCtx.lineWidth = 0.8;

      for (let i = 0; i < numRings; i++) {
        const r = i * ringDist + offset;
        if (r > maxRadius) continue;

        pCtx.beginPath();
        const steps = 140; // Curvas mais suaves
        for (let j = 0; j <= steps; j++) {
          const theta = (j / steps) * Math.PI * 2;

          // Mesmo padrão de onda coerente e paralelo do hero
          const wave1 = Math.sin(theta * 4 + pTime * 0.2) * 3.5;
          const wave2 = Math.cos(theta * 7 - pTime * 0.1) * 1.5;
          const wave3 = Math.sin(theta * 2 + pTime * 0.05) * 2.0;
          const wobble = wave1 + wave2 + wave3;

          const px = pCenterX + Math.cos(theta) * (r + wobble);
          const py = pCenterY + Math.sin(theta) * (r + wobble);

          if (j === 0) pCtx.moveTo(px, py);
          else pCtx.lineTo(px, py);
        }
        pCtx.closePath();
        pCtx.stroke();
      }

      pAnimationId = requestAnimationFrame(pRender);
    };
    
    pRender();

    // Simulação do carregamento técnico da barra de progresso
    const pBar = document.getElementById('preloader-bar');
    const pText = document.getElementById('preloader-text');
    const pOverlay = document.getElementById('page-preloader');
    
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 12 + 6;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        
        if (pBar) pBar.style.width = '100%';
        if (pText) pText.textContent = 'SYSTEM CORE READY';
        
        setTimeout(() => {
          if (pOverlay) {
            pOverlay.classList.add('fade-out');
            document.body.classList.remove('overflow-hidden');
            
            setTimeout(() => {
              cancelAnimationFrame(pAnimationId);
              window.removeEventListener('resize', handlePreloaderResize);
              pOverlay.remove();
            }, 800);
          }
        }, 250);
      } else {
        if (pBar) pBar.style.width = `${progress}%`;
        const statuses = [
          'LOADING INTERFACE MODULES', 
          'SCANNING NETWORK MATRIX', 
          'DECRYPTING BRAND ASSETS', 
          'OPTIMIZING CANVAS RINGS'
        ];
        const statusIdx = Math.floor((progress / 100) * statuses.length);
        if (pText) pText.textContent = statuses[statusIdx];
      }
    }, 70);
  }

  // ==========================================
  // 1. EFEITO HEADER AO SCROLL + MOBILE LOGO-ONLY
  // ==========================================
  const header = document.querySelector('.main-header');
  let _lastScrollY = window.scrollY;

  const handleScroll = () => {
    if (!header) return;
    const cur = window.scrollY;
    const goingDown = cur > _lastScrollY;

    // Scrolled compacto (desktop + mobile)
    header.classList.toggle('scrolled', cur > 20);

    // Mobile: logo-only quando rola para baixo
    if (window.innerWidth <= 768) {
      if (cur > 90 && goingDown) {
        if (!header.classList.contains('nav-logo-only')) {
          header.classList.add('nav-logo-only');
          // Fecha o drawer se estiver aberto
          const mNav = document.getElementById('navigation-menu-links');
          const mBtn = document.getElementById('menu-toggle-btn');
          if (mNav && mNav.classList.contains('active')) {
            mNav.classList.remove('active');
            mBtn && mBtn.classList.remove('active');
            document.body.classList.remove('overflow-hidden');
          }
        }
      } else if (!goingDown || cur < 50) {
        header.classList.remove('nav-logo-only');
      }
    } else {
      header.classList.remove('nav-logo-only');
    }

    _lastScrollY = cur;
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // ==========================================
  // 2. MENU MOBILE (HAMBÚRGUER COESIVO)
  // ==========================================
  const menuToggle = document.getElementById('menu-toggle-btn');
  const navMenu = document.getElementById('navigation-menu-links');
  const body = document.body;

  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      menuToggle.classList.toggle('active');
      navMenu.classList.toggle('active');
      body.classList.toggle('overflow-hidden');
    });

    // Fechar ao clicar em um link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        navMenu.classList.remove('active');
        body.classList.remove('overflow-hidden');
      });
    });

    // Fechar ao clicar fora do menu
    document.addEventListener('click', (e) => {
      if (!navMenu.contains(e.target) && !menuToggle.contains(e.target)) {
        menuToggle.classList.remove('active');
        navMenu.classList.remove('active');
        body.classList.remove('overflow-hidden');
      }
    });
  }

  // ==========================================
  // 3. ANO DINÂMICO NO COPYRIGHT
  // ==========================================
  const yearSpan = document.getElementById('current-year');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  // ==========================================
  // 4. EFEITO PÍLULA DESLIZANTE DE FOCO (LIQUID GLASS)
  // ==========================================
  const navMenuElement = document.getElementById('navigation-menu-links');
  const navLinks = document.querySelectorAll('.nav-link');
  const hoverPill = document.querySelector('.nav-hover-pill');
  
  if (navMenuElement && hoverPill && navLinks.length > 0) {
    const movePill = (link) => {
      if (!link) {
        hoverPill.style.opacity = '0';
        return;
      }
      hoverPill.style.left = `${link.offsetLeft}px`;
      hoverPill.style.width = `${link.offsetWidth}px`;
      hoverPill.style.opacity = '1';
    };

    const activeLink = document.querySelector('.nav-link.active');

    const initPillPosition = () => {
      if (window.innerWidth > 768 && activeLink) {
        setTimeout(() => {
          movePill(activeLink);
        }, 120);
      } else {
        hoverPill.style.opacity = '0';
      }
    };

    initPillPosition();

    navLinks.forEach(link => {
      link.addEventListener('mouseenter', () => {
        if (window.innerWidth > 768) {
          movePill(link);
        }
      });
    });

    navMenuElement.addEventListener('mouseleave', () => {
      if (window.innerWidth > 768) {
        if (activeLink) {
          movePill(activeLink);
        } else {
          hoverPill.style.opacity = '0';
        }
      }
    });

    window.addEventListener('resize', () => {
      initPillPosition();
    });
  }

  // ==========================================
  // 5. MOTOR DE CANVAS: ANÉIS DE CRESCIMENTO (ORGANIC TECH)
  // ==========================================
  const canvas = document.getElementById('hero-growth-rings-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    let mouse = { x: width * 0.5, y: height * 0.45, active: false };
    let time = 0;

    let centerX = width * 0.35;
    let centerY = height * 0.55;

    const ringSpacing = 10;
    let rings = [];

    const generateRings = () => {
      centerX = width * 0.35;
      centerY = height * 0.55;
      const distToTopLeft    = Math.hypot(centerX, centerY);
      const distToTopRight   = Math.hypot(width - centerX, centerY);
      const distToBottomLeft = Math.hypot(centerX, height - centerY);
      const distToBottomRight= Math.hypot(width - centerX, height - centerY);
      const maxRadius = Math.max(distToTopLeft, distToTopRight, distToBottomLeft, distToBottomRight) * 1.1;
      const numRings = Math.ceil(maxRadius / ringSpacing);
      rings.length = 0;
      for (let i = 1; i <= numRings; i++) {
        rings.push({
          baseRadius: i * ringSpacing,
          noiseScale: 0.15 + (i / numRings) * 0.85,
          speedMultiplier: 0.8 + Math.sin(i * 0.15) * 0.2
        });
      }
    };

    const handleResize = () => {
      width  = canvas.width  = window.innerWidth;
      height = canvas.height = window.innerHeight;
      generateRings();
    };
    window.addEventListener('resize', handleResize);
    generateRings();

    const heroSection = document.getElementById('hero-dobra-escura');
    if (heroSection) {
      heroSection.addEventListener('mousemove', (e) => {
        const rect = canvas.getBoundingClientRect();
        mouse.x = e.clientX - rect.left;
        mouse.y = e.clientY - rect.top;
        mouse.active = true;
      });
      heroSection.addEventListener('mouseleave', () => { mouse.active = false; });
    }

    // Desenha um anel individualmente com o estilo atual do ctx
    const drawRing = (ring) => {
      ctx.beginPath();
      const steps = 140;
      for (let j = 0; j <= steps; j++) {
        const theta = (j / steps) * Math.PI * 2;
        const wave1 = Math.sin(theta * 4 + time * 0.2) * 3.5;
        const wave2 = Math.cos(theta * 7 - time * 0.1) * 1.5;
        const wave3 = Math.sin(theta * 2 + time * 0.05) * 2.0;
        const wobble = (wave1 + wave2 + wave3) * ring.noiseScale;
        const r  = ring.baseRadius + wobble;
        const px = centerX + Math.cos(theta) * r;
        const py = centerY + Math.sin(theta) * r;
        if (j === 0) ctx.moveTo(px, py);
        else         ctx.lineTo(px, py);
      }
      ctx.closePath();
      ctx.stroke();
    };

    const drawRingsPattern = () => { rings.forEach(drawRing); };

    const isMobile = () => width <= 768;

    // Estado do pulso radial (mobile)
    let pulseR     = 0;
    const PULSE_SPEED = 1.4;  // px por frame
    const GLOW_W      = 40;   // largura do halo em px

    // Loop de Animação e Renderização
    const render = () => {
      time += 0.003;
      ctx.clearRect(0, 0, width, height);

      if (isMobile()) {
        // ── MOBILE: pulso expansivo do centro às bordas ─────────────────
        pulseR += PULSE_SPEED;
        const maxR = Math.max(
          Math.hypot(centerX, centerY),
          Math.hypot(width - centerX, centerY),
          Math.hypot(centerX, height - centerY),
          Math.hypot(width - centerX, height - centerY)
        );
        if (pulseR > maxR + GLOW_W) pulseR = 0;

        const currentAge = Math.round(pulseR / ringSpacing);

        // Desenhar cada anel com intensidade baseada na distância ao pulso
        rings.forEach(ring => {
          const dist = Math.abs(ring.baseRadius - pulseR);
          if (dist < GLOW_W) {
            const t         = 1 - dist / GLOW_W;
            const intensity = t * t * t;           // cúbico: pico nítido, cauda suave
            ctx.strokeStyle = `rgba(0, 255, 102, ${(intensity * 0.82).toFixed(3)})`;
            ctx.lineWidth   = 0.4 + intensity * 1.8;
          } else {
            ctx.strokeStyle = 'rgba(0, 156, 59, 0.025)';
            ctx.lineWidth   = 0.5;
          }
          drawRing(ring);
        });

        // Label de idade avançando junto com o pulso
        if (pulseR > ringSpacing * 2 && pulseR < maxR) {
          const labelAngle = -Math.PI * 0.35;  // ~63° acima da horizontal
          const lx = centerX + Math.cos(labelAngle) * pulseR;
          const ly = centerY + Math.sin(labelAngle) * pulseR;

          if (lx > 10 && lx < width - 80 && ly > 15 && ly < height - 15) {
            ctx.save();
            const label = `${currentAge} anos`;
            ctx.font    = 'bold 9px monospace';
            const tw    = ctx.measureText(label).width;
            // Fundo mínimo para legibilidade
            ctx.fillStyle = 'rgba(0, 8, 4, 0.65)';
            ctx.fillRect(lx + 4, ly - 12, tw + 8, 15);
            ctx.fillStyle = 'rgba(0, 255, 102, 0.88)';
            ctx.fillText(label, lx + 8, ly - 1);
            ctx.restore();
          }
        }

      } else {
        // ── DESKTOP: spotlight de mouse + retícula técnica ───────────────

        if (!mouse.active) {
          mouse.x += (width  * 0.35 - mouse.x) * 0.06;
          mouse.y += (height * 0.55 - mouse.y) * 0.06;
        }

        ctx.lineWidth   = 0.5;
        ctx.strokeStyle = 'rgba(0, 156, 59, 0.022)';
        drawRingsPattern();

        const radiusGlow = 240;
        const gradient   = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, radiusGlow);
        gradient.addColorStop(0,    'rgba(0, 255, 102, 0.65)');
        gradient.addColorStop(0.35, 'rgba(0, 229, 255, 0.4)');
        gradient.addColorStop(0.7,  'rgba(255, 211, 0, 0.12)');
        gradient.addColorStop(1,    'transparent');
        ctx.strokeStyle = gradient;
        ctx.lineWidth   = 1.0;
        drawRingsPattern();

        if (mouse.active || Math.abs(mouse.x - width * 0.35) > 1) {
          ctx.save();
          ctx.strokeStyle = 'rgba(0, 255, 102, 0.15)';
          ctx.lineWidth   = 0.5;

          ctx.beginPath();
          ctx.arc(mouse.x, mouse.y, 60, 0, Math.PI * 2);
          ctx.stroke();

          ctx.beginPath();
          ctx.moveTo(mouse.x - 70, mouse.y); ctx.lineTo(mouse.x + 70, mouse.y);
          ctx.moveTo(mouse.x, mouse.y - 70); ctx.lineTo(mouse.x, mouse.y + 70);
          ctx.stroke();

          ctx.beginPath();
          ctx.setLineDash([2, 4]);
          ctx.moveTo(centerX, centerY);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.stroke();
          ctx.setLineDash([]);

          ctx.fillStyle = 'rgba(0, 255, 102, 0.7)';
          ctx.font      = '9px monospace';
          const distCenter = Math.round(Math.hypot(mouse.x - centerX, mouse.y - centerY));
          const estAge     = Math.round(distCenter / ringSpacing);
          ctx.fillText(`ANEL_DIST: ${distCenter}px`,       mouse.x + 15, mouse.y - 30);
          ctx.fillText(`IDADE_ESTIMADA: ${estAge} anos`,   mouse.x + 15, mouse.y - 18);
          ctx.fillText(`GEO_REF: 25.378° S`,               mouse.x + 15, mouse.y - 6);
          ctx.restore();
        }
      }

      requestAnimationFrame(render);
    };

    render();
  }

  // ==========================================
  // 6. PREÇOS: SWITCHER DINÂMICO (MENSAL VS ANUAL)
  // ==========================================
  const billingToggle = document.getElementById('billingToggle');
  const priceElements = document.querySelectorAll('[data-annual]');
  const periodElements = document.querySelectorAll('[data-period]');
  const annualBadge = document.getElementById('annualBadge');
  
  if (billingToggle) {
    billingToggle.addEventListener('click', () => {
      billingToggle.classList.toggle('active');
      const isAnnual = billingToggle.classList.contains('active');
      
      // Toggle das labels textuais
      document.getElementById('label-monthly').classList.toggle('active', !isAnnual);
      document.getElementById('label-annual').classList.toggle('active', isAnnual);
      
      if (annualBadge) {
        annualBadge.style.opacity = isAnnual ? '1' : '0.2';
      }

      // Alternar valores dos cards
      priceElements.forEach(price => {
        if (isAnnual) {
          price.textContent = price.getAttribute('data-annual');
        } else {
          price.textContent = price.getAttribute('data-monthly');
        }
      });

      // Alternar textos de período (/ano vs /mês)
      periodElements.forEach(period => {
        period.textContent = isAnnual ? '/ano' : '/mês';
      });
    });
  }
});
