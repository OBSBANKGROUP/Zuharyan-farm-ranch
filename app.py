import os
from flask import Flask, send_from_directory, abort

app = Flask(__name__, static_folder='')

# Read SECRET_KEY from environment for any server-side usage
app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY', None)


@app.route('/')
def index():
    # serve home.html as the index
    return send_from_directory('.', 'home.html')


@app.route('/<path:path>')
def static_proxy(path):
    # serve any static file (html, css, js, images)
    if os.path.exists(path):
        return send_from_directory('.', path)
    # fallback to 404
    abort(404)


if __name__ == '__main__':
    # For local development; Render will use gunicorn via Procfile
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port)
