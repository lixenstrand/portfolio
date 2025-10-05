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

  // Klick på scroll-knapp scrollar ner till content
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
    const gradients = document.querySelectorAll(".gradient");
    const header = document.getElementById('header');

    // Add shadow when scrolled
    if (window.scrollY > 0) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    if (hamburger && navMenu && hamburger.classList.contains("active")) {
      hamburger.classList.remove("active");
      navMenu.classList.remove("active");
      hamburger.setAttribute("aria-expanded", false);
    }

    // Fade in gradients när användaren scrollar - justerad för smidigare övergång
    const heroHeight = window.innerHeight;
    const scrollPosition = window.scrollY;
    const fadeStartPoint = heroHeight * 0.5; // Börjar fade vid 50% av hero-höjden
    const fadeDistance = heroHeight * 0.3; // Fade över 30% av hero-höjden

    let gradientOpacity = (scrollPosition - fadeStartPoint) / fadeDistance;
    gradientOpacity = Math.max(0, Math.min(1, gradientOpacity));

    gradients.forEach((gradient) => {
      gradient.style.opacity = gradientOpacity;
    });

    // Dölj stjärnor när man scrollar genom hero-sektionen
    const heroSection = document.querySelector('#hero');
    if (heroSection) {
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

  AOS.init({
    offset: 290,
    delay: 0,
    duration: 1200,
    easing: "ease",
    once: false,
    mirror: true,
  });
});
