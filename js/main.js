async function loadComponent(elementId, filePath) {
  try {
    const response = await fetch(filePath);
    const html = await response.text();
    document.getElementById(elementId).innerHTML = html;
  } catch (error) {
    console.error(error);
  }
}

function initializeNavigation() {
  const hamburger = document.querySelector('.hamburger');
  const navMenuWrapper = document.querySelector('.nav-menu-wrapper');
  const overlay = document.querySelector('.menu-overlay');
  const navLinks = document.querySelectorAll('.nav-links a');
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';

  navLinks.forEach(link => {
    const href = link.getAttribute('href');

    if (href === currentPage) {
        link.classList.add('active');
    }
});

  if (hamburger) {
    hamburger.addEventListener('click', () => {
      const isOpen = hamburger.classList.toggle('active');
      navMenuWrapper.classList.toggle('active');
      overlay.classList.toggle('active');
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });
  }

  overlay.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenuWrapper.classList.remove('active');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  });

  if (navLinks.length > 0) {
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenuWrapper.classList.remove('active');
        document.body.style.overflow = '';
      });
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  Promise.all([
    loadComponent('header-placeholder', 'header.html'),
    loadComponent('footer-placeholder', 'footer.html')
  ]).then(() => {
    initializeNavigation();
  });
});