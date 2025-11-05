/* ============================================
   BHUSHAN KAPADNE - PORTFOLIO JAVASCRIPT
   Clean, organized, and feature-rich
   ============================================ */

// ========================================
// 1. MOBILE HAMBURGER MENU
// ========================================
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");
const navLinks = document.querySelectorAll(".nav-link");

// Toggle mobile menu on hamburger click
hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navMenu.classList.toggle("active");
});

// Close mobile menu when any navigation link is clicked
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
  });
});

// Close mobile menu when clicking outside
document.addEventListener("click", (e) => {
  if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
  }
});


// ========================================
// 2. DARK/LIGHT THEME TOGGLE
// ========================================
const toggleSwitch = document.querySelector('.theme-switch input[type="checkbox"]');

// Switch between dark and light themes
function switchTheme(e) {
  if (e.target.checked) {
    document.documentElement.setAttribute("data-theme", "dark");
    localStorage.setItem("theme", "dark");
  } else {
    document.documentElement.setAttribute("data-theme", "light");
    localStorage.setItem("theme", "light");
  }
}

// Apply saved theme on page load
const currentTheme = localStorage.getItem("theme");
if (currentTheme) {
  document.documentElement.setAttribute("data-theme", currentTheme);
  if (currentTheme === "dark") {
    toggleSwitch.checked = true;
  }
}

// Listen for theme toggle changes
toggleSwitch.addEventListener("change", switchTheme);


// ========================================
// 3. SCROLL SPY - Active Navigation Link
// ========================================
const sections = document.querySelectorAll("section");

function updateActiveLink() {
  const scrollY = window.pageYOffset;

  sections.forEach((section) => {
    const sectionHeight = section.offsetHeight;
    const sectionTop = section.offsetTop - 100;
    const sectionId = section.getAttribute("id");

    // Check if section is in viewport
    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      // Remove active class from all links
      navLinks.forEach((link) => link.classList.remove("active-link"));
      
      // Add active class to current section's link
      const activeLink = document.querySelector(`.nav-link[href*="${sectionId}"]`);
      if (activeLink) {
        activeLink.classList.add("active-link");
      }
    }
  });

  // Special case: Highlight "Home" when at the very top
  const homeLink = document.querySelector('.nav-link[href="#"]');
  if (scrollY < 100 && homeLink) {
    navLinks.forEach((link) => link.classList.remove("active-link"));
    homeLink.classList.add("active-link");
  }
}

// Run scroll spy on scroll and page load
window.addEventListener("scroll", updateActiveLink);
window.addEventListener("DOMContentLoaded", updateActiveLink);


// ========================================
// 4. SMOOTH SCROLL FOR NAVIGATION LINKS
// ========================================
navLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    const href = link.getAttribute("href");
    
    // Only apply smooth scroll to internal links
    if (href.startsWith("#")) {
      e.preventDefault();
      const targetId = href.substring(1);
      const targetSection = document.getElementById(targetId);
      
      if (targetSection) {
        targetSection.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      } else if (href === "#") {
        // Scroll to top if clicked on home/logo
        window.scrollTo({
          top: 0,
          behavior: "smooth"
        });
      }
    }
  });
});


// ========================================
// 5. SCROLL TO TOP BUTTON
// ========================================
const scrollTopBtn = document.getElementById("scroll-top-btn");

// Show/hide scroll-to-top button based on scroll position
window.addEventListener("scroll", () => {
  if (window.pageYOffset > 300) {
    scrollTopBtn.classList.add("show");
  } else {
    scrollTopBtn.classList.remove("show");
  }
});

// Scroll to top when button is clicked
if (scrollTopBtn) {
  scrollTopBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });
}


// ========================================
// 6. DYNAMIC YEAR IN FOOTER
// ========================================
const yearElement = document.querySelector("#datee");
if (yearElement) {
  const currentYear = new Date().getFullYear();
  yearElement.textContent = currentYear;
}


// ========================================
// 7. CONTACT FORM HANDLING (with Formspree)
// ========================================
const contactForm = document.querySelector(".contact-form");
const formStatus = document.getElementById("form-status");

if (contactForm) {
  contactForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = new FormData(contactForm);

    try {
      const response = await fetch(contactForm.action, {
        method: contactForm.method,
        body: formData,
        headers: { Accept: "application/json" },
      });

      if (response.ok) {
        formStatus.textContent = "✅ Thank you! Your message has been sent successfully.";
        formStatus.style.color = "green";
        contactForm.reset();
      } else {
        formStatus.textContent = "❌ Oops! Something went wrong. Please try again.";
        formStatus.style.color = "red";
      }
    } catch (error) {
      formStatus.textContent = "⚠️ Network error! Please check your connection.";
      formStatus.style.color = "orange";
    }
  });
}


// ========================================
// 8. PROJECT CARDS ANIMATION ON SCROLL
// ========================================
const projectCards = document.querySelectorAll(".card");

// Intersection Observer for scroll animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -100px 0px"
};

const cardObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
    }
  });
}, observerOptions);

// Apply animation to each card
projectCards.forEach((card, index) => {
  card.style.opacity = "0";
  card.style.transform = "translateY(30px)";
  card.style.transition = `all 0.5s ease ${index * 0.1}s`;
  cardObserver.observe(card);
});


// ========================================
// 9. TYPING EFFECT FOR HERO SECTION (Optional)
// ========================================
const heroTitle = document.querySelector(".header-container h2");

if (heroTitle) {
  const text = heroTitle.textContent;
  heroTitle.textContent = "";
  let index = 0;

  function typeWriter() {
    if (index < text.length) {
      heroTitle.textContent += text.charAt(index);
      index++;
      setTimeout(typeWriter, 100);
    }
  }

  // Start typing effect when page loads
  window.addEventListener("load", () => {
    setTimeout(typeWriter, 500);
  });
}


// ========================================
// 10. PREVENT EXTERNAL LINK WARNINGS
// ========================================
const externalLinks = document.querySelectorAll('a[target="_blank"]');

externalLinks.forEach((link) => {
  // Add rel attributes for security
  link.setAttribute("rel", "noopener noreferrer");
});


// ========================================
// 11. PERFORMANCE: DEBOUNCE SCROLL EVENTS
// ========================================
function debounce(func, wait = 10) {
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

// Apply debounce to scroll event for better performance
const debouncedScrollSpy = debounce(updateActiveLink, 10);
window.addEventListener("scroll", debouncedScrollSpy);


// ========================================
// 12. CONSOLE MESSAGE (Fun Easter Egg!)
// ========================================
console.log(
  "%c👋 Hi there, Developer!",
  "color: #ffcd42; font-size: 20px; font-weight: bold;"
);
console.log(
  "%cLooking at my code? Feel free to check out the repository!",
  "color: #666; font-size: 14px;"
);
console.log(
  "%c🚀 Built with HTML, CSS, and JavaScript",
  "color: #4CAF50; font-size: 12px;"

);
