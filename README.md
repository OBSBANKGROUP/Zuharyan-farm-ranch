# Zuhayrān Farm Ranch - Static site served by Flask (for Render)

This repository contains a static site (HTML/CSS/JS) and a minimal Flask wrapper so it can be deployed on Render.

Quick start (local):

1. Create a virtualenv and install dependencies

```bash
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

2. Run locally

```bash
export SECRET_KEY="your-secret-here"
python app.py
```

On Render

1. Create a new Web Service, link to this repository.
2. Set Environment > SECRET_KEY to a strong random value.
3. The service should auto-detect `render.yaml` or you can set the build and start commands manually:
   - Build Command: `pip install -r requirements.txt`
   - Start Command: `gunicorn app:app`

Security note: keep your `SECRET_KEY` in Render's environment variables and never commit a `.env` file containing it to the repo.
