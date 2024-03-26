document.addEventListener("DOMContentLoaded", function () {
  const hamburger = document.querySelector(".hamburger");
  const navMenu = document.querySelector(".nav-menu");

  hamburger.addEventListener("click", () => {
    console.log("clicked");
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
  });

  document.querySelectorAll(".nav-menu li").forEach((n) =>
    n.addEventListener("click", () => {
      hamburger.classList.remove("active");
      navMenu.classList.remove("active");
    })
  );

  window.addEventListener("scroll", () => {
    const arrow = document.querySelector(".arrow");

    if (hamburger.classList.contains("active")) {
      hamburger.classList.remove("active");
    }
    if (navMenu.classList.contains("active")) {
      navMenu.classList.remove("active");
    }

    const opacityScaleFactor = 300;

    let opacity = 1 - window.scrollY / opacityScaleFactor;

    opacity = Math.max(0, Math.min(1, opacity));

    if (arrow) {
      arrow.style.opacity = opacity;
    }
  });

  AOS.init();

  AOS.init({
    offset: 290,
    delay: 0,
    duration: 1200,
    easing: "ease",
    once: false,
    mirror: true,
  });
});
