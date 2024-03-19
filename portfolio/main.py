from flask import Flask, request, render_template
from flask_mail import Mail, Message

app = Flask(__name__, static_folder='static', template_folder='templates')

# Konfigurera Flask-Mail
app.config['MAIL_SERVER'] = 'smtp.gmail.com'
app.config['MAIL_PORT'] = 587
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USERNAME'] = 'mlixenstrand@gmail.com'
app.config['MAIL_PASSWORD'] = 'qhkp vicq odna aubj'
mail = Mail(app)


@app.route('/')
def home():
    return render_template('index.html')


@app.route('/about')
def about_page():
    return render_template('about.html')


@app.route('/send_mail', methods=['POST'])
def send_mail():
    try:
        # Försök hämta JSON-data från förfrågan
        data = request.get_json()
        # Kontrollera om data inte kunde hämtas
        if data is None:
            return 'Inga data skickades!', 400

        # Hämta data från JSON
        name = data.get('name')  # Använd .get för att undvika KeyError om nyckeln inte finns
        email = data.get('email')
        message = data.get('message')

        # Validera att all nödvändig information finns
        if not all([name, email, message]):
            return 'Alla fält är inte ifyllda!', 400

        # Konfigurera och skicka e-postmeddelandet
        subject = f"{name} har skrivit i Kontaktformuläret"
        recipient = ['magnus@nordmet.se']
        msg = Message(subject, sender=email, recipients=recipient)
        msg.body = f"Namn: {name}\nE-post: {email}\nMeddelande: {message}"
        mail.send(msg)

        return 'E-postmeddelandet skickades!', 200
    except Exception as e:
        # Logga undantaget för debugging
        print(e)
        return str(e), 500


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8080)
