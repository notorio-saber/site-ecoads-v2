// Comportamentos Globais e Efeitos Visuais Premium — EcoAds V2

document.addEventListener('DOMContentLoaded', () => {
  // ==========================================
  // 1. EFEITO HEADER AO SCROLL
  // ==========================================
  const header = document.querySelector('.main-header');
  
  const handleScroll = () => {
    if (header) {
      if (window.scrollY > 20) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }
  };

  window.addEventListener('scroll', handleScroll);
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
    
    // Configurações dos anéis
    const numRings = 24;
    const ringSpacing = 16;
    const rings = [];
    
    // Centro do tronco (deslocado para a esquerda/baixo para maior assimetria estética)
    const centerX = width * 0.35;
    const centerY = height * 0.55;

    // Gerar deformação orgânica de anéis
    for (let i = 1; i <= numRings; i++) {
      rings.push({
        baseRadius: i * ringSpacing,
        // Fases de wobble para deformação
        phase1: Math.random() * Math.PI * 2,
        phase2: Math.random() * Math.PI * 2,
        amplitude1: 3 + Math.random() * 4,
        amplitude2: 1 + Math.random() * 3,
      });
    }

    // Adaptar tamanho da tela
    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Trackear coordenadas do mouse na hero
    const heroSection = document.getElementById('hero-dobra-escura');
    const trackMouse = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.active = true;
    };
    
    if (heroSection) {
      heroSection.addEventListener('mousemove', trackMouse);
      heroSection.addEventListener('mouseleave', () => {
        // Retorna devagar para o centro
        mouse.active = false;
      });
    }

    // Loop de Animação e Renderização
    const render = () => {
      time += 0.005;
      ctx.clearRect(0, 0, width, height);

      // Suavizar o retorno do cursor ao centro do layout quando inativo
      if (!mouse.active) {
        const targetX = width * 0.35;
        const targetY = height * 0.55;
        mouse.x += (targetX - mouse.x) * 0.08;
        mouse.y += (targetY - mouse.y) * 0.08;
      }

      // 1. Desenhar anéis de fundo em tom extremamente escuro/sutil
      ctx.lineWidth = 0.5;
      ctx.strokeStyle = 'rgba(0, 156, 59, 0.025)'; // Verde florestal bem sutil
      
      rings.forEach(ring => {
        ctx.beginPath();
        const steps = 180;
        for (let j = 0; j <= steps; j++) {
          const theta = (j / steps) * Math.PI * 2;
          
          // Equação para deformação WOOD GRAIN (ruído orgânico baseado em senos)
          const wobble = Math.sin(theta * 3 + ring.phase1 + time * 0.5) * ring.amplitude1 +
                         Math.cos(theta * 5 + ring.phase2 - time * 0.2) * ring.amplitude2;
          
          const r = ring.baseRadius + wobble;
          const px = centerX + Math.cos(theta) * r;
          const py = centerY + Math.sin(theta) * r;
          
          if (j === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        }
        ctx.closePath();
        ctx.stroke();
      });

      // 2. Criar máscara de iluminação (Spotlight) baseada em gradiente radial no cursor
      const radiusGlow = 220;
      const gradient = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, radiusGlow);
      gradient.addColorStop(0, 'rgba(0, 255, 102, 0.65)'); // Verde neon central
      gradient.addColorStop(0.3, 'rgba(0, 229, 255, 0.45)'); // Azul tecnológico
      gradient.addColorStop(0.65, 'rgba(255, 211, 0, 0.15)'); // Amarelo ouro sutil
      gradient.addColorStop(1, 'transparent');

      // 3. Desenhar os mesmos anéis com a cor do spotlight
      ctx.strokeStyle = gradient;
      ctx.lineWidth = 1;
      
      rings.forEach(ring => {
        ctx.beginPath();
        const steps = 180;
        for (let j = 0; j <= steps; j++) {
          const theta = (j / steps) * Math.PI * 2;
          
          const wobble = Math.sin(theta * 3 + ring.phase1 + time * 0.5) * ring.amplitude1 +
                         Math.cos(theta * 5 + ring.phase2 - time * 0.2) * ring.amplitude2;
          
          const r = ring.baseRadius + wobble;
          const px = centerX + Math.cos(theta) * r;
          const py = centerY + Math.sin(theta) * r;
          
          if (j === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        }
        ctx.closePath();
        ctx.stroke();
      });

      // 4. Desenhar elementos de interface técnica (linhas de retícula e dados)
      if (mouse.active || Math.abs(mouse.x - width * 0.35) > 1) {
        ctx.save();
        ctx.strokeStyle = 'rgba(0, 255, 102, 0.15)';
        ctx.lineWidth = 0.5;
        
        // Círculo de rastreamento do mouse
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 60, 0, Math.PI * 2);
        ctx.stroke();
        
        // Cruz de mira técnica
        ctx.beginPath();
        ctx.moveTo(mouse.x - 70, mouse.y);
        ctx.lineTo(mouse.x + 70, mouse.y);
        ctx.moveTo(mouse.x, mouse.y - 70);
        ctx.lineTo(mouse.x, mouse.y + 70);
        ctx.stroke();
        
        // Linha conectando o centro ao cursor
        ctx.beginPath();
        ctx.setLineDash([2, 4]);
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(mouse.x, mouse.y);
        ctx.stroke();

        // Parâmetros florestais em formato de código de dados
        ctx.fillStyle = 'rgba(0, 255, 102, 0.7)';
        ctx.font = '9px monospace';
        
        const distCenter = Math.round(Math.hypot(mouse.x - centerX, mouse.y - centerY));
        const estAge = Math.round(distCenter / ringSpacing);
        
        ctx.fillText(`ANEL_DIST: ${distCenter}px`, mouse.x + 15, mouse.y - 30);
        ctx.fillText(`IDADE_ESTIMADA: ${estAge} anos`, mouse.x + 15, mouse.y - 18);
        ctx.fillText(`GEO_REF: 25.378° S`, mouse.x + 15, mouse.y - 6);
        ctx.restore();
      }

      requestAnimationFrame(render);
    };

    render();
  }

  // ==========================================
  // 6. DASHBOARD INTERATIVO (ABAS)
  // ==========================================
  const sidebarItems = document.querySelectorAll('.sidebar-item');
  const chartTitle = document.getElementById('chart-title');
  const chartSubtitle = document.getElementById('chart-subtitle');
  const polyline = document.querySelector('.chart-svg polyline');
  const polygon = document.querySelector('.chart-svg polygon');
  
  // Dados simulados para interatividade do painel geotecnológico
  const tabData = {
    inventarios: {
      title: 'Inventário Florestal Dinâmico',
      subtitle: 'Processamento em lote via LeafBook e LeafTag',
      metric1: '15.420',
      metric2: '24.8 cm',
      metric3: '99.4%',
      points: '0,40 10,38 20,42 30,30 40,35 50,20 60,25 70,15 80,18 90,10 100,5'
    },
    gis: {
      title: 'Monitoramento Territorial & GIS',
      subtitle: 'Processamento de ortofotos e índices de vegetação',
      metric1: '42.850 ha',
      metric2: '0.78 NDVI',
      metric3: '99.9%',
      points: '0,45 10,42 20,35 30,38 40,25 50,28 60,18 70,20 80,12 90,15 100,8'
    },
    monitoramento: {
      title: 'Detecção de Desmatamento',
      subtitle: 'Satélites Sentinel-2 e Planet Labs integrados',
      metric1: '12 Alertas',
      metric2: '0.45 ha',
      metric3: '100.0%',
      points: '0,48 10,46 20,47 30,44 40,40 50,35 60,22 70,25 80,15 90,10 100,2'
    }
  };

  if (sidebarItems.length > 0 && polyline && polygon) {
    sidebarItems.forEach(item => {
      item.addEventListener('click', () => {
        sidebarItems.forEach(i => i.classList.remove('active'));
        item.classList.add('active');
        
        const tab = item.getAttribute('data-tab');
        const data = tabData[tab];
        
        if (data) {
          // Atualizar textos e métricas do painel
          if (chartTitle) chartTitle.textContent = data.title;
          if (chartSubtitle) chartSubtitle.textContent = data.subtitle;
          
          document.getElementById('metric-val-1').textContent = data.metric1;
          document.getElementById('metric-val-2').textContent = data.metric2;
          document.getElementById('metric-val-3').textContent = data.metric3;
          
          // Atualizar pontos do gráfico simulado com animação
          polyline.setAttribute('points', data.points);
          
          // Recriar o polígono de preenchimento do gradiente
          const polygonPoints = `${data.points} 100,50 0,50`;
          polygon.setAttribute('points', polygonPoints);
        }
      });
    });
  }

  // ==========================================
  // 7. PREÇOS: SWITCHER DINÂMICO (MENSAL VS ANUAL)
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
