from dotenv import load_dotenv
from flask import Flask, request, render_template, redirect
from flask_mail import Mail, Message
import os

load_dotenv()

app = Flask(__name__, static_folder='static', template_folder='templates')


app.config['MAIL_SERVER'] = os.environ.get('MAIL_SERVER', 'smtp.gmail.com')
app.config['MAIL_PORT'] = int(os.environ.get('MAIL_PORT', 587))
app.config['MAIL_USE_TLS'] = os.environ.get('MAIL_USE_TLS', 'True') == 'True'
app.config['MAIL_USERNAME'] = os.environ.get('MAIL_USERNAME')
app.config['MAIL_PASSWORD'] = os.environ.get('MAIL_PASSWORD')
mail = Mail(app)


#@app.before_request
#def redirect_nonwww():
#    if request.host.startswith('www.'):
#        return  # Ingenting att göra om det redan är www
#    else:
#        new_url = 'https://www.' + request.host + request.path
#        return redirect(new_url, code=301)



@app.route('/')
def home():
    return render_template('index.html')


@app.route('/about')
def about_page():
    return render_template('about.html')


@app.route('/resume')
def resume_page():
    return render_template('resume.html')


@app.route('/send_mail', methods = ['POST'])
def send_mail():
    try:

        data = request.get_json()

        if data is None:
            return 'Inga data skickades!', 400


        name = data.get('name')
        email = data.get('email')
        message = data.get('message')


        if not all([name, email, message]):
            return 'Alla fält är inte ifyllda!', 400

        subject = f"{name} har skrivit i Kontaktformuläret"
        recipient = ['magnus@nordmet.se']
        msg = Message(subject, sender=email, recipients=recipient)
        msg.body = f"Namn: {name}\nE-post: {email}\nMeddelande: {message}"
        mail.send(msg)

        return 'E-postmeddelandet skickades!', 200
    except Exception as e:

        print(e)
        return str(e), 500


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8080)
