document.addEventListener("DOMContentLoaded", function () {
  // Auto-update copyright year
  const yearSpan = document.getElementById('current-year');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

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

  // Stäng hamburgermeny vid scroll + navbar shadow effect + stjärnfade
  window.addEventListener("scroll", () => {
    const header = document.getElementById('header');

    // Add shadow when scrolled
    if (window.scrollY > 0) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    // Close hamburger menu
    if (hamburger && navMenu && hamburger.classList.contains("active")) {
      hamburger.classList.remove("active");
      navMenu.classList.remove("active");
      hamburger.setAttribute("aria-expanded", false);
    }

    // Dölj stjärnor när man scrollar genom hero-sektionen
    const heroSection = document.querySelector('#hero');
    if (heroSection) {
      const scrollPosition = window.scrollY;
      const heroHeight = heroSection.offsetHeight;

      // Börja fade när man scrollat 10% av hero-sektionens höjd
      const fadeStart = heroHeight * 0.1;
      const fadeDistance = heroHeight * 0.35; // Fade över 35% av hero-höjden

      if (scrollPosition > fadeStart) {
        const fadeProgress = Math.min(1, (scrollPosition - fadeStart) / fadeDistance);
        document.body.style.setProperty('--stars-opacity', 1 - fadeProgress);
      } else {
        document.body.style.setProperty('--stars-opacity', 1);
      }
    }
  });

  // Init AOS animations
  AOS.init({
    offset: 100,
    delay: 0,
    duration: 800,
    easing: "ease",
    once: true,
  });
});
