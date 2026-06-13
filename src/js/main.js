// Comportamentos Globais — EcoAds V2

document.addEventListener('DOMContentLoaded', () => {
  // 1. Efeito Header ao Scroll
  const header = document.querySelector('.main-header');
  
  const handleScroll = () => {
    if (window.scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll);
  handleScroll(); // Checar estado inicial

  // 2. Menu Mobile (Hamburguer)
  const menuToggle = document.querySelector('.menu-toggle');
  const navMenu = document.querySelector('.nav-menu');
  const body = document.body;

  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      menuToggle.classList.toggle('active');
      navMenu.classList.toggle('active');
      body.classList.toggle('overflow-hidden'); // Travar scroll de fundo
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

  // 3. Ano Dinâmico no Copyright
  const yearSpan = document.getElementById('current-year');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  // 4. Efeito Pílula Deslizante Interativa (Liquid Hover)
  const navMenuElement = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');
  const hoverPill = document.querySelector('.nav-hover-pill');
  
  if (navMenuElement && hoverPill && navLinks.length > 0) {
    // Função para mover a pílula de hover
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

    // Inicialização da posição (com delay para renderização de fontes)
    const initPillPosition = () => {
      if (window.innerWidth > 768 && activeLink) {
        setTimeout(() => {
          movePill(activeLink);
        }, 100);
      } else {
        hoverPill.style.opacity = '0';
      }
    };

    initPillPosition();

    // Eventos de entrada do cursor nos itens
    navLinks.forEach(link => {
      link.addEventListener('mouseenter', () => {
        if (window.innerWidth > 768) {
          movePill(link);
        }
      });
    });

    // Retorno ao link ativo quando o cursor sai do menu
    navMenuElement.addEventListener('mouseleave', () => {
      if (window.innerWidth > 768) {
        if (activeLink) {
          movePill(activeLink);
        } else {
          hoverPill.style.opacity = '0';
        }
      }
    });

    // Ajustar posicionamento no resize
    window.addEventListener('resize', () => {
      initPillPosition();
    });
  }

  // 5. Efeito Spotlight Interativo no Hero (Mouse segue e ilumina)
  const heroSection = document.getElementById('hero-dobra-escura');
  if (heroSection) {
    heroSection.addEventListener('mousemove', (e) => {
      const rect = heroSection.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      heroSection.style.setProperty('--mouse-x', `${x}px`);
      heroSection.style.setProperty('--mouse-y', `${y}px`);
    });
  }
});
