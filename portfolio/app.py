from flask import Flask, request, render_template
from flask_mail import Mail, Message

app = Flask(__name__, static_folder='static', template_folder='templates')

# Konfigurera Flask-Mail
app.config['MAIL_SERVER'] = 'smtp.gmail.com'
app.config['MAIL_PORT'] = 587
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USERNAME'] = 'dinemail@gmail.com'
app.config['MAIL_PASSWORD'] = 'dittlösenord'
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
        data = request.get_json()
        if data is None:
            return 'Inga data skickades!', 400

        name = data['name']
        subject = f"{name} har skrivit i Kontaktformuläret"
        sender = data['email']
        message = data['message']
        recipient = ['magnus@nordmet.se']

        msg = Message(subject, sender=[sender], recipients=recipient)
        msg.body = f"Namn: {name}\nE-post: {sender}\nMeddelande: {message}"
        mail.send(msg)

        return 'E-postmeddelandet skickades!', 200
    except Exception as e:
        return str(e), 500


if __name__ == '__main__':
    app.run()
