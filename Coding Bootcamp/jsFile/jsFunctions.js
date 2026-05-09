document.addEventListener('DOMContentLoaded', function() {
  initMenuToggle();
  initFormValidation();
  initSmoothScroll();
  initTableRowSelection();
});

/* ===== MENU TOGGLE ===== */
function initMenuToggle() {
  const menuToggle = document.getElementById('menuToggle');
  const navMenu = document.querySelector('.nav-menu');
  
  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', function() {
      navMenu.classList.toggle('open');
    });
  }

  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    link.addEventListener('click', function() {
      if (navMenu && navMenu.classList.contains('open')) {
        navMenu.classList.remove('open');
      }
    });
  });
}

/* ===== FORM VALIDATION ===== */
function initFormValidation() {
  const forms = document.querySelectorAll('form');
  
  forms.forEach(form => {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const inputs = form.querySelectorAll('input[required], textarea[required]');
      let isValid = true;
      
      inputs.forEach(input => {
        if (input.value.trim() === '') {
          input.classList.add('input-error');
          input.classList.remove('input-valid');
          isValid = false;
        } else {
          input.classList.add('input-valid');
          input.classList.remove('input-error');
        }
      });
      
      if (isValid) {
        showMessage('Form submitted successfully!', 'success');
        form.reset();
      } else {
        showMessage('Please fill in all required fields', 'error');
      }
    });
  });
}

/* ===== SMOOTH SCROLL ===== */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
}

/* ===== TABLE ROW SELECTION ===== */
function initTableRowSelection() {
  const tableRows = document.querySelectorAll('table tbody tr');
  tableRows.forEach(row => {
    row.addEventListener('click', function() {
      this.classList.toggle('table-row-selected');
    });
  });
}

/* ===== SHOW MESSAGE ===== */
function showMessage(message, type) {
  const messageDiv = document.createElement('div');
  messageDiv.className = 'toast-message';
  
  if (type === 'success') {
    messageDiv.classList.add('toast-success');
  } else if (type === 'error') {
    messageDiv.classList.add('toast-error');
  }
  
  messageDiv.textContent = message;
  document.body.appendChild(messageDiv);
  
  setTimeout(() => {
    messageDiv.classList.add('toast-message-slide-out');
    setTimeout(() => messageDiv.remove(), 300);
  }, 3000);
}

/* ===== HELPER FUNCTIONS ===== */
function validateEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

function validatePassword(password) {
  return password.length >= 8;
}

function formatCurrency(amount) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'PKR'
  }).format(amount);
}

function getQueryParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}

function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/* ===== ANIMATIONS ===== */
const style = document.createElement('style');
style.textContent = `
  @keyframes slideIn {
    from { transform: translateX(400px); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
  }
  
  @keyframes slideOut {
    from { transform: translateX(0); opacity: 1; }
    to { transform: translateX(400px); opacity: 0; }
  }
`;
document.head.appendChild(style);