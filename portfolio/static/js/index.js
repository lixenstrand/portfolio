function init() {
    document.querySelector('.contactPopUp').addEventListener('click', function() {
        swal.fire({
            title: 'Contact Me',
            animation: true,
            customClass:{
                popup: 'custom-popup',
                confirmButton: 'custom-confirm-button',
                cancelButton: 'custom-cancel-button'
            },
            position: 'center',
            html: '<p style="color: white; font-family: \'Oxygen Mono\', monospace;"></p><input type="text" placeholder="Your name..." id="name" class="swal2-input" style="color: black;"> <input type="text" placeholder="Your email..." id="email" class="swal2-input"> <textarea placeholder="Your message..." id="message" class="swal2-textarea"></textarea>',
            showCancelButton: true,
            confirmButtonText: 'Send',
            footer: '<span style="color: white; font-family: \'Oxygen Mono\', monospace;">I will get back to you as soon as possible!</span>',

            preConfirm: () => {
                            if (!ValidateEmail(document.getElementById('email').value)) 
                                swal.showValidationMessage('Please enter a valid email');
                            else if (document.getElementById('name').value === '' || document.getElementById('message').value === '') {
                                swal.showValidationMessage('Please fill in all the fields');
                            } else {
                                // Skapa dataobjektet som ska skickas
                                const emailData = {
                                    name: document.getElementById('name').value,
                                    email: document.getElementById('email').value,
                                    message: document.getElementById('message').value
                                };

                            // Använd fetch för att skicka en POST-begäran till /send_mail endpointen
                                console.log(emailData);
                            fetch('/send_mail', {
                                        method: 'POST',
                                        headers: {
                                            'Content-Type': 'application/json',
                                        },
                                        body: JSON.stringify(emailData),
                                    })
                                    .then(response => response.text())
                                    .then(message => console.log(message))
                                    .catch(error => console.error('Error:', error));
                                            
                                }
            }       
        
                    }).then((result) => {
                        if (result.isConfirmed) {
                            swal.fire({
                                title: 'Thank you!',
                                html: `<span style="color: white; font-family: 'Oxygen Mono', monospace;">Your message has been sent</span>`,
                                confirmButtonText: 'Ok',
                                customClass:{
                                    popup: 'custom-popup',
                                    confirmButton: 'custom-confirm-button',
                                }
                            });
                        }
                    });
                });
            }



function ValidateEmail(mail) 
{
 return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail);

}



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

const element = document.querySelector('#element');
if (window.innerWidth > 768 && element) {
    var typed = new Typed('#element', {
        strings: [
            '<h2 class="h2-min">I code.</h2>',
            '<h2 class="h2-min">I travel.</h2>',
            '<h2 class="h2-min">I read.</h2>',
            '<h2 class="h2-min">I explore.</h2>',
            '<h2 class="h2-min">I play.</h2>',
            '<h2 class="h2-min">I cook.</h2>'
        ],
        typeSpeed: 100,
        backSpeed: 80,
        smartBackspace: false,
        loop: true,
        backDelay: 700,
        cursorChar: '',
        autoInsertCss: true,
    });
} else if (window.innerWidth < 768 && element) {
    var typed = new Typed('#element', {
        strings: [
            '<h2 class="h2-min">I cook.</h2>',
            '<h2 class="h2-min">I code.</h2>',
            '<h2 class="h2-min">I run.</h2>',
            '<h2 class="h2-min">I play.</h2>',
            '<h2 class="h2-min">I read.</h2>',
        ],
        typeSpeed: 100,
        backSpeed: 80,
        smartBackspace: false,
        loop: true,
        backDelay: 700,
        cursorChar: '',
        autoInsertCss: true,
    });
}


document.addEventListener('DOMContentLoaded', function() {
    init();

    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');



    hamburger.addEventListener('click', () => {
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



});
