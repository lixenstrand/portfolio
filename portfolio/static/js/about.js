
document.addEventListener('DOMContentLoaded', function() {


    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');




    hamburger.addEventListener('click', () => {
        console.log('clicked');
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');

    })


document.querySelectorAll('.nav-menu li').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');

}));


window.addEventListener('scroll', () => {
    const arrow = document.querySelector('.arrow');

    // Kontrollerar om klassen 'active' är tillagd och tar bort den vid scroll
    if (hamburger.classList.contains('active')) {
        hamburger.classList.remove('active');
    }
    if (navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
    }

    // Använd en skalfaktor för att justera hur snabbt opacity minskar med scroll
    // Exempel: En mindre värde som 100 gör att pilen blir genomskinlig snabbare
    const opacityScaleFactor = 300; // Justera detta värde efter behov

    // Beräknar nytt opacity baserat på scroll position och skalfaktorn
    let opacity = 1 - window.scrollY / opacityScaleFactor;

    // Säkerställer att opacity-värdet ligger mellan 0 och 1
    opacity = Math.max(0, Math.min(1, opacity));

    if (arrow) {
        arrow.style.opacity = opacity;
    }
});


 AOS.init();

  // You can also pass an optional settings object
// below listed default settings
AOS.init({
    // Global settings:
    // Settings that can be overridden on per-element basis, by `data-aos-*` attributes:
    offset: 290, // offset (in px) from the original trigger point
    delay: 0, // values from 0 to 3000, with step 50ms
    duration: 1200, // values from 0 to 3000, with step 50ms
    easing: 'ease', // default easing for AOS animations
    once: false, // whether animation should happen only once - while scrolling down
    mirror: true, // whether elements should animate out while scrolling past them
})


});
