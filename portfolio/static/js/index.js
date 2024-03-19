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



document.addEventListener('DOMContentLoaded', function() {
    init();
});
