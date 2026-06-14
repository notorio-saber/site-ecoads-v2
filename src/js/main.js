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
  // 1. EFEITO HEADER AO SCROLL
  // ==========================================
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
    
    // Centro do tronco (ligeiramente deslocado para assimetria natural)
    let centerX = width * 0.35;
    let centerY = height * 0.55;
    
    const ringSpacing = 10; // Espaçamento menor para anéis mais densos (estilo digital/fibra)
    let rings = [];

    // Perfil cônico e realista de copa de Pinus (usado na geração e desenho)
    const getCrownWidthAt = (ry) => {
      if (ry < 0.6) {
        return ry / 0.6; // cresce de 0 a 1
      } else {
        return 1 - (ry - 0.6) / 0.4 * 0.35; // estreita suavemente até 0.65 na base
      }
    };

    // Silhuetas de Pinus interativas (lado direito)
    const pineTrees = [
      { xPercent: 0.74, heightPercent: 0.42, species: 'Pinus taeda', dbh: '28.4 cm', height: '24.5 m', heightNum: 24.5, vol: '0.68 m³', sort: 'Serraria' },
      { xPercent: 0.81, heightPercent: 0.36, species: 'Pinus taeda', dbh: '22.1 cm', height: '21.2 m', heightNum: 21.2, vol: '0.42 m³', sort: 'Processo' },
      { xPercent: 0.88, heightPercent: 0.46, species: 'Pinus taeda', dbh: '31.8 cm', height: '26.8 m', heightNum: 26.8, vol: '0.89 m³', sort: 'Laminadora' }
    ];

    // Gerar pontos estáticos da nuvem (LiDAR point cloud) para cada árvore
    pineTrees.forEach(tree => {
      tree.cloudPoints = [];
      const numPoints = 85;
      for (let i = 0; i < numPoints; i++) {
        const ry = Math.random(); // 0 a 1 ao longo da copa
        const maxW = getCrownWidthAt(ry);
        const rx = (Math.random() - 0.5) * 2 * maxW; // -maxW a +maxW
        tree.cloudPoints.push({ rx, ry });
      }
    });

    // Função para gerar os anéis concêntricos que cobrem a tela
    const generateRings = () => {
      centerX = width * 0.35;
      centerY = height * 0.55;
      
      // Encontrar a distância máxima até os cantos para cobrir 100% da dobra
      const distToTopLeft = Math.hypot(centerX, centerY);
      const distToTopRight = Math.hypot(width - centerX, centerY);
      const distToBottomLeft = Math.hypot(centerX, height - centerY);
      const distToBottomRight = Math.hypot(width - centerX, height - centerY);
      const maxRadius = Math.max(distToTopLeft, distToTopRight, distToBottomLeft, distToBottomRight) * 1.1;
      
      const numRings = Math.ceil(maxRadius / ringSpacing);
      rings.length = 0; // Limpar array
      
      for (let i = 1; i <= numRings; i++) {
        rings.push({
          baseRadius: i * ringSpacing,
          // Propriedades individuais sutis de ruído para dar variação orgânica
          noiseScale: 0.15 + (i / numRings) * 0.85, // anéis externos têm variações ligeiramente maiores
          speedMultiplier: 0.8 + Math.sin(i * 0.15) * 0.2
        });
      }
    };

    // Adaptar tamanho da tela e recalcular anéis
    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      generateRings();
    };
    window.addEventListener('resize', handleResize);
    
    // Inicializar os anéis
    generateRings();

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
        mouse.active = false;
      });
    }

    // Função auxiliar para desenhar uma silhueta de Pinus técnica
    const drawPineTree = (tx, ty, tHeight, strokeStyle, isHovered, isGlow, tree) => {
      ctx.save();
      ctx.strokeStyle = strokeStyle;
      ctx.lineWidth = isHovered ? 1.2 : 0.6;
      
      const crownBaseY = ty - tHeight * 0.4;
      const crownTopY = ty - tHeight;
      const crownHeight = tHeight * 0.6;
      
      // Desenhar tronco
      ctx.beginPath();
      ctx.moveTo(tx, ty);
      ctx.lineTo(tx, ty - tHeight);
      ctx.stroke();

      // Desenhar galhos (curva quadrática, estilo Pinus)
      const numBranches = 14;
      ctx.beginPath();
      for (let i = 0; i < numBranches; i++) {
        const ratio = i / (numBranches - 1);
        const bY = crownTopY + crownHeight * ratio;
        const maxW = getCrownWidthAt(ratio);
        const bWidth = (tHeight * 0.16) * maxW;
        
        const endXLeft = tx - bWidth;
        const endXRight = tx + bWidth;
        const endY = bY - 8 * (1 - ratio);
        
        ctx.moveTo(tx, bY);
        ctx.quadraticCurveTo(tx - bWidth * 0.5, bY + 3, endXLeft, endY);
        ctx.moveTo(tx, bY);
        ctx.quadraticCurveTo(tx + bWidth * 0.5, bY + 3, endXRight, endY);
      }
      ctx.stroke();

      // Desenhar Point Cloud (LiDAR returns) se estiver acesa (spotlight ou hover)
      if ((isGlow || isHovered) && tree && tree.cloudPoints) {
        ctx.fillStyle = isHovered ? 'rgba(0, 255, 102, 0.7)' : 'rgba(0, 229, 255, 0.25)';
        tree.cloudPoints.forEach(p => {
          const px = tx + p.rx * (tHeight * 0.16);
          const py = crownTopY + p.ry * crownHeight;
          ctx.beginPath();
          if (isHovered && Math.random() > 0.98) {
            // Alguns pontos piscam em verde neon puro
            ctx.fillStyle = '#00ff66';
            ctx.arc(px, py, 1.2, 0, Math.PI * 2);
            ctx.fill();
            ctx.fillStyle = 'rgba(0, 255, 102, 0.7)';
          } else {
            ctx.arc(px, py, 0.7, 0, Math.PI * 2);
            ctx.fill();
          }
        });
      }

      // Linhas de varredura LiDAR (anéis horizontais de diâmetro) no fuste
      if (isHovered || isGlow) {
        ctx.strokeStyle = isHovered ? 'rgba(0, 255, 102, 0.5)' : 'rgba(0, 229, 255, 0.15)';
        const scanRings = 5;
        for (let i = 1; i <= scanRings; i++) {
          const ringY = ty - (tHeight * 0.4 / scanRings) * i;
          const rRadius = 3.5 * (1 - (i / scanRings) * 0.4);
          ctx.beginPath();
          ctx.ellipse(tx, ringY, rRadius, rRadius * 0.3, 0, 0, Math.PI * 2);
          ctx.stroke();
        }
      }
      ctx.restore();
    };

    // Loop de Animação e Renderização
    const render = () => {
      time += 0.003; // Movimento suave lento
      ctx.clearRect(0, 0, width, height);

      // Suavizar o retorno do cursor ao centro do layout quando inativo
      if (!mouse.active) {
        const targetX = width * 0.35;
        const targetY = height * 0.55;
        mouse.x += (targetX - mouse.x) * 0.06;
        mouse.y += (targetY - mouse.y) * 0.06;
      }

      // Função para renderizar um conjunto de anéis com determinado estilo
      const drawRingsPattern = () => {
        rings.forEach(ring => {
          ctx.beginPath();
          const steps = 140; // Passos suficientes para curvas lisas
          for (let j = 0; j <= steps; j++) {
            const theta = (j / steps) * Math.PI * 2;
            
            // RUÍDO COERENTE PARALELO: Os anéis compartilham as fases de onda
            // Isso faz as deformações ficarem perfeitamente alinhadas, imitando madeira ou digitais
            const wave1 = Math.sin(theta * 4 + time * 0.2) * 3.5;
            const wave2 = Math.cos(theta * 7 - time * 0.1) * 1.5;
            const wave3 = Math.sin(theta * 2 + time * 0.05) * 2.0;
            
            // Somar as ondas e multiplicar pelo fator individual do anel
            const wobble = (wave1 + wave2 + wave3) * ring.noiseScale;
            
            const r = ring.baseRadius + wobble;
            const px = centerX + Math.cos(theta) * r;
            const py = centerY + Math.sin(theta) * r;
            
            if (j === 0) ctx.moveTo(px, py);
            else ctx.lineTo(px, py);
          }
          ctx.closePath();
          ctx.stroke();
        });
      };

      // 1. Desenhar anéis de fundo em tom de verde florestal sutil e muito escuro
      ctx.lineWidth = 0.5;
      ctx.strokeStyle = 'rgba(0, 156, 59, 0.022)'; // Linhas finas de fundo sutil
      drawRingsPattern();

      // 2. Desenhar as silhuetas das árvores no fundo (muito sutil)
      if (width > 1024) {
        pineTrees.forEach(tree => {
          const tx = tree.xPercent * width;
          const ty = height * 0.85;
          const tHeight = tree.heightPercent * height;
          const mouseDistX = Math.abs(mouse.x - tx);
          const isHovered = mouse.active && mouseDistX < 45 && mouse.y > (ty - tHeight - 40) && mouse.y < ty + 20;
          
          drawPineTree(tx, ty, tHeight, 'rgba(0, 156, 59, 0.08)', isHovered, false, tree);
        });
      }

      // 3. Criar máscara de iluminação (Spotlight) baseada em gradiente radial no cursor
      const radiusGlow = 240; // Raio ampliado para melhor alcance visual
      const gradient = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, radiusGlow);
      gradient.addColorStop(0, 'rgba(0, 255, 102, 0.65)'); // Verde neon
      gradient.addColorStop(0.35, 'rgba(0, 229, 255, 0.4)'); // Azul royal tecnológico
      gradient.addColorStop(0.7, 'rgba(255, 211, 0, 0.12)'); // Amarelo ouro
      gradient.addColorStop(1, 'transparent');

      // 4. Desenhar os mesmos anéis com a cor do spotlight acesa
      ctx.strokeStyle = gradient;
      ctx.lineWidth = 1.0;
      drawRingsPattern();

      // 5. Desenhar as silhuetas das árvores acesas pelo spotlight do cursor
      if (width > 1024) {
        pineTrees.forEach(tree => {
          const tx = tree.xPercent * width;
          const ty = height * 0.85;
          const tHeight = tree.heightPercent * height;
          const mouseDistX = Math.abs(mouse.x - tx);
          const isHovered = mouse.active && mouseDistX < 45 && mouse.y > (ty - tHeight - 40) && mouse.y < ty + 20;

          drawPineTree(tx, ty, tHeight, gradient, isHovered, true, tree);
          
          // Se houver hover direto no fuste/silhueta, desenha callout técnico neon e efeitos de scan
          if (isHovered) {
            ctx.save();
            const crownBaseY = ty - tHeight * 0.4;
            const crownTopY = ty - tHeight;
            const crownHeight = tHeight * 0.6;

            // 5a. Desenhar Bounding Box de detecção inteligente
            const pad = 8;
            const bLeft = tx - (tHeight * 0.16) - pad;
            const bRight = tx + (tHeight * 0.16) + pad;
            const bTop = crownTopY - pad;
            const bBottom = crownBaseY + pad;

            ctx.strokeStyle = 'rgba(0, 255, 102, 0.3)';
            ctx.lineWidth = 0.8;
            ctx.setLineDash([2, 4]);
            ctx.strokeRect(bLeft, bTop, bRight - bLeft, bBottom - bTop);
            ctx.setLineDash([]); // reset

            // Cantoneiras da Bounding Box (estilo visor)
            const bLen = 8;
            ctx.strokeStyle = 'rgba(0, 255, 102, 0.85)';
            ctx.beginPath();
            // Top Left
            ctx.moveTo(bLeft + bLen, bTop); ctx.lineTo(bLeft, bTop); ctx.lineTo(bLeft, bTop + bLen);
            // Top Right
            ctx.moveTo(bRight - bLen, bTop); ctx.lineTo(bRight, bTop); ctx.lineTo(bRight, bTop + bLen);
            // Bottom Left
            ctx.moveTo(bLeft + bLen, bBottom); ctx.lineTo(bLeft, bBottom); ctx.lineTo(bLeft, bBottom - bLen);
            // Bottom Right
            ctx.moveTo(bRight - bLen, bBottom); ctx.lineTo(bRight, bBottom); ctx.lineTo(bRight, bBottom - bLen);
            ctx.stroke();

            // 5b. Desenhar régua de altura (fita hpsométrica)
            ctx.strokeStyle = 'rgba(0, 229, 255, 0.3)';
            ctx.fillStyle = 'rgba(0, 229, 255, 0.65)';
            ctx.font = '8px monospace';
            ctx.beginPath();
            ctx.moveTo(bRight + 12, bBottom);
            ctx.lineTo(bRight + 12, bTop);
            ctx.stroke();

            for (let hTick = 0; hTick <= 1; hTick += 0.25) {
              const tickY = bBottom - (bBottom - bTop) * hTick;
              const tickVal = Math.round(tree.heightNum * hTick * 10) / 10;
              ctx.beginPath();
              ctx.moveTo(bRight + 12, tickY);
              ctx.lineTo(bRight + 17, tickY);
              ctx.stroke();
              ctx.fillText(`${tickVal}m`, bRight + 20, tickY + 3);
            }

            // 5c. Linha laser de varredura ativa (LiDAR scan sweep)
            const scanTimeVal = (Date.now() / 1200) % (Math.PI * 2);
            const scanProgress = 0.5 + 0.5 * Math.sin(scanTimeVal); // 0 a 1
            const scanY = crownTopY + crownHeight * scanProgress;
            const relativeScanY = (scanY - crownTopY) / crownHeight;
            const currentW = (tHeight * 0.16) * getCrownWidthAt(relativeScanY);

            // Desenhar elipse de corte do laser
            ctx.strokeStyle = 'rgba(0, 255, 102, 0.8)';
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.ellipse(tx, scanY, currentW + 3, (currentW + 3) * 0.25, 0, 0, Math.PI * 2);
            ctx.stroke();

            // Feixe horizontal estendido
            ctx.strokeStyle = 'rgba(0, 255, 102, 0.3)';
            ctx.beginPath();
            ctx.moveTo(tx - currentW - 12, scanY);
            ctx.lineTo(tx + currentW + 12, scanY);
            ctx.stroke();

            // 5d. Desenhar HUD Callout Glassmorphic para dados técnicos
            const boxW = 154;
            const boxH = 92;
            const boxX = tx - boxW - 32;
            const boxY = ty - tHeight * 0.55 - boxH / 2;

            // Fundo escuro glass
            ctx.fillStyle = 'rgba(4, 12, 8, 0.9)';
            ctx.fillRect(boxX, boxY, boxW, boxH);

            // Borda fina neon
            ctx.strokeStyle = 'rgba(0, 255, 102, 0.4)';
            ctx.lineWidth = 1;
            ctx.strokeRect(boxX, boxY, boxW, boxH);

            // Sub-cabeçalho decorativo
            ctx.fillStyle = 'rgba(0, 255, 102, 0.1)';
            ctx.fillRect(boxX, boxY, boxW, 16);
            ctx.strokeStyle = 'rgba(0, 255, 102, 0.25)';
            ctx.beginPath();
            ctx.moveTo(boxX, boxY + 16);
            ctx.lineTo(boxX + boxW, boxY + 16);
            ctx.stroke();

            // Texto do cabeçalho HUD
            ctx.fillStyle = '#00ff66';
            ctx.font = 'bold 8px monospace';
            ctx.fillText('LIDAR SCANNER [ID: PINUS-03]', boxX + 6, boxY + 11);

            // Linha conectora pontilhada
            ctx.strokeStyle = 'rgba(0, 255, 102, 0.5)';
            ctx.beginPath();
            ctx.setLineDash([2, 2]);
            ctx.moveTo(tx, ty - tHeight * 0.55);
            ctx.lineTo(boxX + boxW, ty - tHeight * 0.55);
            ctx.stroke();
            ctx.setLineDash([]); // reset

            // Conteúdo textual
            ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
            ctx.font = '9px monospace';
            const startY = boxY + 29;
            const rowH = 11;
            ctx.fillText(`ESPÉCIE : ${tree.species}`, boxX + 8, startY);
            ctx.fillText(`DAP     : ${tree.dbh}`, boxX + 8, startY + rowH);
            ctx.fillText(`ALTURA  : ${tree.height}`, boxX + 8, startY + rowH * 2);
            ctx.fillText(`VOL_EST : ${tree.vol}`, boxX + 8, startY + rowH * 3);
            ctx.fillText(`SORT    : ${tree.sort}`, boxX + 8, startY + rowH * 4);

            ctx.restore();
          }
        });
      }

      // 6. Desenhar elementos de interface técnica (linhas de retícula e dados do anel)
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

        // Parâmetros do anel concêntrico sob o cursor
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
