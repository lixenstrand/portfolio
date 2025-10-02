from dotenv import load_dotenv
from flask import Flask, request, render_template, send_from_directory, redirect, Response, url_for
from flask_mail import Mail, Message
import os
from datetime import datetime

load_dotenv()

app = Flask(__name__, static_folder='static', template_folder='templates')

# Disable caching for development
app.config['TEMPLATES_AUTO_RELOAD'] = True
app.config['SEND_FILE_MAX_AGE_DEFAULT'] = 0

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


@app.route('/blog')
def blog():
    return render_template('blog.html')


@app.route('/blog/<article>')
def blog_article(article):
    return render_template(f'blog/{article}.html')



@app.route('/cv/<filename>')
def get_cv(filename):
    return send_from_directory('static/cv', filename)


@app.route('/robots.txt')
def robots():
    """Serve robots.txt file for search engines"""
    return send_from_directory('..', 'robots.txt')


@app.route('/sitemap.xml')
def sitemap():
    """Generate dynamic sitemap for search engines"""
    # Base URL (uppdatera till din faktiska domän)
    base_url = 'https://magnuslixenstrand.se'

    # Lista alla sidor med prioritet och uppdateringsfrekvens
    pages = [
        {'url': '/', 'priority': '1.0', 'changefreq': 'weekly'},
        {'url': '/about', 'priority': '0.8', 'changefreq': 'monthly'},
        {'url': '/blog', 'priority': '0.9', 'changefreq': 'weekly'},
        {'url': '/blog/automatisera-saljteam', 'priority': '0.7', 'changefreq': 'monthly'},
        {'url': '/blog/fran-sales-till-automation', 'priority': '0.7', 'changefreq': 'monthly'},
        {'url': '/blog/5-flaskhalsar-sme', 'priority': '0.7', 'changefreq': 'monthly'},
    ]

    # Generera XML
    sitemap_xml = ['<?xml version="1.0" encoding="UTF-8"?>']
    sitemap_xml.append('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">')

    # Dagens datum för lastmod
    today = datetime.now().strftime('%Y-%m-%d')

    for page in pages:
        sitemap_xml.append('  <url>')
        sitemap_xml.append(f'    <loc>{base_url}{page["url"]}</loc>')
        sitemap_xml.append(f'    <lastmod>{today}</lastmod>')
        sitemap_xml.append(f'    <changefreq>{page["changefreq"]}</changefreq>')
        sitemap_xml.append(f'    <priority>{page["priority"]}</priority>')
        sitemap_xml.append('  </url>')

    sitemap_xml.append('</urlset>')

    return Response('\n'.join(sitemap_xml), mimetype='application/xml')


@app.route('/send_mail', methods = ['POST'])
def send_mail():
    try:

        data = request.get_json()

        if data is None:
            return 'Inga data skickades!', 400


        name = data.get('name')
        email = data.get('email')
        company = data.get('company', 'Inget företag angivet')
        message = data.get('message')


        if not all([name, email, message]):
            return 'Alla fält är inte ifyllda!', 400

        subject = f"{name} har skrivit i Kontaktformuläret"
        recipient = ['magnus@nordmet.se']
        msg = Message(subject, sender=email, recipients=recipient)
        msg.body = f"Namn: {name}\nE-post: {email}\nFöretag: {company}\n\nMeddelande:\n{message}"
        mail.send(msg)

        return 'E-postmeddelandet skickades!', 200
    except Exception as e:

        print(e)
        return str(e), 500


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8080)
