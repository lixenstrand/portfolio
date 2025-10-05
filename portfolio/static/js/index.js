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

function init() {
  const contactPopUp = document.querySelector(".contactPopUp");
  if (contactPopUp) {
    contactPopUp.addEventListener("click", function () {
      swal
        .fire({
          title: "💬 Kontakta mig",
          animation: true,
          customClass: {
            popup: "custom-popup",
            confirmButton: "custom-confirm-button",
            cancelButton: "custom-cancel-button",
          },
          position: "center",
          html: `
            <div style="margin: 0.5rem 0;">
              <input type="text" placeholder="Ditt namn..." id="name" class="swal2-input">
              <input type="email" placeholder="Din email..." id="email" class="swal2-input">
              <input type="text" placeholder="Eventuellt företag..." id="company" class="swal2-input">
              <textarea placeholder="Ditt meddelande..." id="message" class="swal2-textarea"></textarea>
            </div>
          `,
          showCancelButton: true,
          confirmButtonText: "✉️ Skicka",
          cancelButtonText: "Avbryt",
          footer:
            "<span style=\"font-family: 'Oxygen Mono', monospace; color: var(--aqua);\">💡 Jag återkommer så snart jag kan!</span>",

          preConfirm: () => {
            if (!ValidateEmail(document.getElementById("email").value)) {
              swal.showValidationMessage("Var snäll och skriv en giltig mail.");
              return false;
            } else if (
              document.getElementById("name").value === "" ||
              document.getElementById("message").value === ""
            ) {
              swal.showValidationMessage("var snäll och skriv i alla fälten.");
              return false;
            } else {
              const emailData = {
                name: document.getElementById("name").value,
                email: document.getElementById("email").value,
                company: document.getElementById("company").value || "Inget företag angivet",
                message: document.getElementById("message").value,
              };

              // Visa loading spinner
              Swal.showLoading();

              // VIKTIGT: Returnera promise så SweetAlert2 väntar
              return fetch("/send_mail", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(emailData),
              })
                .then((response) => {
                  if (!response.ok) {
                    throw new Error("Kunde inte skicka meddelandet");
                  }
                  return response.text();
                })
                .catch((error) => {
                  swal.showValidationMessage(
                    `Ett fel uppstod: ${error.message}. Prova igen eller maila direkt till mlixenstrand@gmail.com`
                  );
                  return undefined;
                });
            }
          },
        })
        .then((result) => {
          if (result.isConfirmed) {
            swal.fire({
              title: "✅ Tack!",
              html: `
                <div style="margin: 1rem 0;">
                  <p style="color: white; font-family: 'Oxygen Mono', monospace; font-size: clamp(1rem, 3vw, 1.2rem); line-height: 1.6;">
                    Ditt meddelande har skickats
                  </p>
                  <p style="color: var(--aqua); font-family: 'Oxygen Mono', monospace; margin-top: 1rem; font-size: clamp(0.9rem, 2.5vw, 1rem);">
                    Jag återkommer inom 24 timmar! 🚀
                  </p>
                </div>
              `,
              confirmButtonText: "Stäng",
              customClass: {
                popup: "custom-popup",
                confirmButton: "custom-confirm-button",
              },
            });
          }
        });
    });
  }
}

function ValidateEmail(mail) {
  return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,})+$/.test(mail);
}

document.addEventListener("DOMContentLoaded", function () {
  // Initiera AOS animations
  AOS.init({
    offset: 290,
    delay: 0,
    duration: 1200,
    easing: "ease",
    once: true,
    mirror: false,
    disable: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  });

  // Initiera Typed.js för hero-sektion
  const element = document.querySelector("#element span[aria-hidden='true']");
  let typed;
  if (element) {
    // Unified config för både desktop och mobile
    typed = new Typed("#element span[aria-hidden='true']", {
      strings: [
        'Jag kodar.',
        'Jag springer.',
        'Jag lagar mat.',
        'Jag läser.',
        'Jag vandrar.',
      ],
      typeSpeed: 80,
      backSpeed: 60,
      smartBackspace: true,
      loop: true,
      backDelay: 1500,
      showCursor: false,
      autoInsertCss: true,
      startDelay: 800,
    });
  }

  init();

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
