function init() {
  document
    .querySelector(".contactPopUp")
    .addEventListener("click", function () {
      swal
        .fire({
          title: "Contact Me",
          animation: true,
          customClass: {
            popup: "custom-popup",
            confirmButton: "custom-confirm-button",
            cancelButton: "custom-cancel-button",
          },
          position: "center",
          html: '<p style="color: white; font-family: \'Oxygen Mono\', monospace;"></p><input type="text" placeholder="Your name..." id="name" class="swal2-input" style="color: black;"> <input type="text" placeholder="Your email..." id="email" class="swal2-input"> <textarea placeholder="Your message..." id="message" class="swal2-textarea"></textarea>',
          showCancelButton: true,
          confirmButtonText: "Send",
          footer:
            "<span style=\"color: white; font-family: 'Oxygen Mono', monospace;\">I will get back to you as soon as possible!</span>",

          preConfirm: () => {
            if (!ValidateEmail(document.getElementById("email").value))
              swal.showValidationMessage("Please enter a valid email");
            else if (
              document.getElementById("name").value === "" ||
              document.getElementById("message").value === ""
            ) {
              swal.showValidationMessage("Please fill in all the fields");
            } else {
              const emailData = {
                name: document.getElementById("name").value,
                email: document.getElementById("email").value,
                message: document.getElementById("message").value,
              };

              console.log(emailData);
              fetch("/send_mail", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(emailData),
              })
                .then((response) => response.text())
                .then((message) => console.log(message))
                .catch((error) => console.error("Error:", error));
            }
          },
        })
        .then((result) => {
          if (result.isConfirmed) {
            swal.fire({
              title: "Thank you!",
              html: `<span style="color: white; font-family: 'Oxygen Mono', monospace;">Your message has been sent</span>`,
              confirmButtonText: "Ok",
              customClass: {
                popup: "custom-popup",
                confirmButton: "custom-confirm-button",
              },
            });
          }
        });
    });
}

function ValidateEmail(mail) {
  return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail);
}

AOS.init();

AOS.init({
  offset: 290,
  delay: 0,
  duration: 1200,
  easing: "ease",
  once: false,
  mirror: true,
});

const element = document.querySelector("#element");
if (window.innerWidth > 768 && element) {
  var typed = new Typed("#element", {
    strings: [
      '<h2 class="h2-min">I code.</h2>',
      '<h2 class="h2-min">I travel.</h2>',
      '<h2 class="h2-min">I read.</h2>',
      '<h2 class="h2-min">I explore.</h2>',
      '<h2 class="h2-min">I play.</h2>',
      '<h2 class="h2-min">I cook.</h2>',
      '<h2 class="h2-min">I meditate.</h2>',
      '<h2 class="h2-min">I hike.</h2>',
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
} else if (window.innerWidth < 768 && element) {
  var typed = new Typed("#element", {
    strings: [
      '<h2 class="h2-min">I code.</h2>',
      '<h2 class="h2-min">I run.</h2>',
      '<h2 class="h2-min">I cook.</h2>',
      '<h2 class="h2-min">I play.</h2>',
      '<h2 class="h2-min">I read.</h2>',
      '<h2 class="h2-min">I hike.</h2>',
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

document.addEventListener("DOMContentLoaded", function () {
  init();

  const hamburger = document.querySelector(".hamburger");
  const navMenu = document.querySelector(".nav-menu");

  hamburger.addEventListener("click", () => {
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

    // en skalfaktor för att justera hur snabbt opacity minskar med scroll
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
