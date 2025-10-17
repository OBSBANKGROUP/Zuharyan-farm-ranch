import os
from flask import Flask, send_from_directory, abort

app = Flask(__name__, static_folder='')

# Read SECRET_KEY from environment for any server-side usage
app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY', None)


@app.before_first_request
def log_startup_info():
    # Log whether SECRET_KEY is set (do not print the value)
    if app.config.get('SECRET_KEY'):
        app.logger.info('SECRET_KEY is set in environment')
    else:
        app.logger.warning('SECRET_KEY not set; set SECRET_KEY in your environment')


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


@app.route('/health')
def health():
    # Simple health endpoint for Render health checks
    return {"status": "ok"}, 200


if __name__ == '__main__':
    # For local development; Render will use gunicorn via Procfile
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port)
