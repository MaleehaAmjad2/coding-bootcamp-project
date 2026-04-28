document.addEventListener('DOMContentLoaded', function() {
  initMenuToggle();
  initFormValidation();
  initSmoothScroll();
  initTableRowSelection();
});

/* ===== MENU TOGGLE ===== */
function initMenuToggle() {
  const menuToggle = document.getElementById('menuToggle');
  const navMenu = document.querySelector('nav ul');
  
  if (menuToggle) {
    menuToggle.addEventListener('click', function() {
      navMenu.classList.toggle('open');
    });
  }

  const navLinks = document.querySelectorAll('nav a');
  navLinks.forEach(link => {
    link.addEventListener('click', function() {
      if (navMenu.classList.contains('open')) {
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
          input.style.borderColor = '#FF6B6B';
          isValid = false;
        } else {
          input.style.borderColor = '#FFB6D9';
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
  messageDiv.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    padding: 15px 25px;
    border-radius: 6px;
    font-weight: 600;
    z-index: 1000;
    animation: slideIn 0.3s ease;
  `;
  
  if (type === 'success') {
    messageDiv.style.background = '#4CAF50';
    messageDiv.style.color = 'white';
  } else if (type === 'error') {
    messageDiv.style.background = '#FF6B6B';
    messageDiv.style.color = 'white';
  }
  
  messageDiv.textContent = message;
  document.body.appendChild(messageDiv);
  
  setTimeout(() => {
    messageDiv.style.animation = 'slideOut 0.3s ease';
    setTimeout(() => messageDiv.remove(), 300);
  }, 3000);
}

/* ===== EMAIL VALIDATION ===== */
function validateEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

/* ===== PASSWORD VALIDATION ===== */
function validatePassword(password) {
  return password.length >= 8;
}

/* ===== FORMAT CURRENCY ===== */
function formatCurrency(amount) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(amount);
}

/* ===== GET QUERY PARAMETER ===== */
function getQueryParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

/* ===== SCROLL TO TOP ===== */
function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}

/* ===== DEBOUNCE ===== */
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
    from {
      transform: translateX(400px);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
  
  @keyframes slideOut {
    from {
      transform: translateX(0);
      opacity: 1;
    }
    to {
      transform: translateX(400px);
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);