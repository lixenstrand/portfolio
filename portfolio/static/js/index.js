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
            <div style="margin: 1.5rem 0;">
              <input type="text" placeholder="Ditt namn..." id="name" class="swal2-input" style="width: 100%; box-sizing: border-box;">
              <input type="email" placeholder="Din email..." id="email" class="swal2-input" style="width: 100%; box-sizing: border-box;">
              <input type="text" placeholder="Eventuellt företag..." id="company" class="swal2-input" style="width: 100%; box-sizing: border-box;">
              <textarea placeholder="Ditt meddelande..." id="message" class="swal2-textarea" style="width: 100%; box-sizing: border-box;"></textarea>
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
                <div style="margin: 1.5rem 0;">
                  <p style="color: white; font-family: 'Oxygen Mono', monospace; font-size: 1.2rem;">
                    Ditt meddelande har skickats
                  </p>
                  <p style="color: var(--aqua); font-family: 'Oxygen Mono', monospace; margin-top: 1rem;">
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
    once: false,
    mirror: true,
  });

  // Initiera Typed.js för hero-sektion
  const element = document.querySelector("#element");
  let typed;
  if (window.innerWidth > 768 && element) {
    typed = new Typed("#element", {
      strings: [
        '<h2 class="h2-min">Jag kodar.</h2>',
        '<h2 class="h2-min">Jag springer.</h2>',
        '<h2 class="h2-min">Jag lagar mat.</h2>',
        '<h2 class="h2-min">Jag läser.</h2>',
        '<h2 class="h2-min">Jag vandrar.</h2>',
      ],
      typeSpeed: 100,
      backSpeed: 80,
      smartBackspace: false,
      loop: true,
      backDelay: 700,
      cursorChar: "",
      autoInsertCss: true,
      startDelay: 1200,
    });
  } else if (element) {
    typed = new Typed("#element", {
      strings: [
        '<h2 class="h2-min">Jag kodar.</h2>',
        '<h2 class="h2-min">Jag springer.</h2>',
        '<h2 class="h2-min">Jag lagar mat.</h2>',
        '<h2 class="h2-min">Jag läser.</h2>',
        '<h2 class="h2-min">Jag vandrar.</h2>',
      ],
      typeSpeed: 100,
      backSpeed: 80,
      smartBackspace: false,
      loop: true,
      backDelay: 700,
      cursorChar: "",
      autoInsertCss: true,
    });
  }

  init();

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
  });
});
