// Footer year
document.getElementById('year').textContent = new Date().getFullYear();

// Hamburger menu toggle
const btn = document.getElementById('hamburgerBtn');
const menu = document.getElementById('site-menu');

if (btn && menu) {
  const closeMenu = () => {
    // If focus is inside menu, move it back to button before hiding
    if (menu.contains(document.activeElement)) {
      btn.focus();
    }

    menu.classList.remove('open');
    btn.setAttribute('aria-expanded', 'false');
    menu.setAttribute('aria-hidden', 'true');
    menu.setAttribute('inert', ''); 
  };

  const openMenu = () => {
    menu.classList.add('open');
    btn.setAttribute('aria-expanded', 'true');
    menu.setAttribute('aria-hidden', 'false');
    menu.removeAttribute('inert'); 

    
    const firstLink = menu.querySelector('a.menu-item');
    if (firstLink) firstLink.focus();
  };

  btn.addEventListener('click', () => {
    const isOpen = btn.getAttribute('aria-expanded') === 'true';
    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  // Close menu on outside click
  document.addEventListener('click', (e) => {
    if (!menu.classList.contains('open')) return;
    if (!menu.contains(e.target) && e.target !== btn && !btn.contains(e.target)) {
      closeMenu();
    }
  });

  // Close menu on ESC key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && menu.classList.contains('open')) {
      closeMenu();
    }
  });
}



// Section fade-in
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('in-view');
  });
}, { threshold: 0.12 });
document.querySelectorAll('section').forEach(s => observer.observe(s));

// Contact form
const contactForm = document.getElementById('contactForm');
const statusDiv = document.getElementById('form-status');

if (contactForm && statusDiv) { // Only run if the form exists
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();

    emailjs.sendForm('service_axmkkrl', 'template_7ruq9z7', this)
      .then(() => {
        statusDiv.textContent = "✅ Message sent successfully!";
        statusDiv.className = "show success";

        contactForm.reset();

        // Auto-clear after 5 seconds with fade-out
        setTimeout(() => {
          statusDiv.classList.remove("show");
          statusDiv.textContent = "";
        }, 5000);
      })
      .catch(error => {
        console.error("EmailJS error:", error);
        statusDiv.textContent = "❌ Oops... Something went wrong. Please try again.";
        statusDiv.className = "show error";
      });
  });
}



// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', function(e) {
    const targetId = this.getAttribute('href').slice(1);
    const target = document.getElementById(targetId);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });

      if (menu.classList.contains('open')) {
  menu.classList.remove('open');
  btn.setAttribute('aria-expanded','false');
  menu.setAttribute('aria-hidden','true');
   }

    }
  });
});



