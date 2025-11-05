// Auto-update copyright year
document.addEventListener('DOMContentLoaded', function() {
  const yearSpan = document.getElementById('current-year');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }
});

// Navbar scroll shadow effect
window.addEventListener('scroll', function() {
  const header = document.getElementById('header');
  if (window.scrollY > 0) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});

document.addEventListener("DOMContentLoaded", function () {
  // Lightbox för bilder på mobil
  function initLightbox() {
    // Skapa lightbox-element om det inte finns
    if (!document.querySelector('.lightbox')) {
      const lightbox = document.createElement('div');
      lightbox.className = 'lightbox';
      lightbox.innerHTML = `
        <div class="lightbox-content">
          <button class="lightbox-close" aria-label="Stäng">×</button>
          <img class="lightbox-image" src="" alt="">
          <div class="lightbox-hint">👆 Zooma med fingrar</div>
        </div>
      `;
      document.body.appendChild(lightbox);

      const lightboxEl = document.querySelector('.lightbox');
      const lightboxImg = document.querySelector('.lightbox-image');
      const closeBtn = document.querySelector('.lightbox-close');

      // Funktion för att öppna lightbox
      function openLightbox(imgSrc, imgAlt) {
        lightboxImg.src = imgSrc;
        lightboxImg.alt = imgAlt;
        lightboxEl.classList.add('active');
        document.body.style.overflow = 'hidden'; // Förhindra scroll
      }

      // Funktion för att stänga lightbox
      function closeLightbox() {
        lightboxEl.classList.remove('active');
        document.body.style.overflow = ''; // Återställ scroll
        setTimeout(() => {
          lightboxImg.src = '';
        }, 300);
      }

      // Event listeners
      closeBtn.addEventListener('click', closeLightbox);

      // Stäng vid klick på bakgrund
      lightboxEl.addEventListener('click', (e) => {
        if (e.target === lightboxEl) {
          closeLightbox();
        }
      });

      // Stäng med ESC-tangent
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightboxEl.classList.contains('active')) {
          closeLightbox();
        }
      });

      // Lägg till klick-funktion på alla projektbilder (fungerar på alla skärmstorlekar)
      const projectImages = document.querySelectorAll('#projects img');
      projectImages.forEach(img => {
        img.style.cursor = 'pointer'; // Visa att bilden är klickbar
        img.addEventListener('click', () => {
          openLightbox(img.src, img.alt);
        });
      });
    }
  }

  initLightbox();

  const hamburger = document.querySelector(".hamburger");
  const navMenu = document.querySelector(".nav-menu");

  if (hamburger && navMenu) {
    function toggleMenu() {
      const isActive = hamburger.classList.toggle("active");
      navMenu.classList.toggle("active");
      hamburger.setAttribute("aria-expanded", isActive);
    }

    hamburger.addEventListener("click", toggleMenu);

    hamburger.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        toggleMenu();
      }
    });

    document.querySelectorAll(".nav-menu li").forEach((n) =>
      n.addEventListener("click", () => {
        hamburger.classList.remove("active");
        navMenu.classList.remove("active");
        hamburger.setAttribute("aria-expanded", false);
      })
    );
  }

  // Klick på scroll-knapp scrollar ner till projekt
  const scrollButton = document.querySelector(".scroll-to-projects");
  if (scrollButton) {
    scrollButton.addEventListener("click", (e) => {
      e.preventDefault();
      const projectsSection = document.querySelector("#projects");
      if (projectsSection) {
        projectsSection.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  }

  window.addEventListener("scroll", () => {
    const gradients = document.querySelectorAll(".gradient, .gradient-project, .gradientTheOtherWay");

    if (hamburger && navMenu && hamburger.classList.contains("active")) {
      hamburger.classList.remove("active");
      navMenu.classList.remove("active");
      hamburger.setAttribute("aria-expanded", false);
    }

    // Fade in gradients när användaren scrollar
    const opacityScaleFactor = 300;
    let gradientOpacity = window.scrollY / opacityScaleFactor;
    gradientOpacity = Math.max(0, Math.min(1, gradientOpacity));

    gradients.forEach((gradient) => {
      gradient.style.opacity = gradientOpacity;
    });

    // Dölj stjärnor när man scrollar genom intro-sektionen
    const introSection = document.querySelector('#intro');
    if (introSection) {
      const scrollPosition = window.scrollY;
      const introHeight = introSection.offsetHeight;

      // Börja fade när man scrollat 10% av intro-sektionens höjd
      const fadeStart = introHeight * 0.1;
      const fadeDistance = introHeight * 0.35; // Fade över 35% av intro-höjden

      if (scrollPosition > fadeStart) {
        const fadeProgress = Math.min(1, (scrollPosition - fadeStart) / fadeDistance);
        document.body.style.setProperty('--stars-opacity', 1 - fadeProgress);
      } else {
        document.body.style.setProperty('--stars-opacity', 1);
      }
    }
  });
});
