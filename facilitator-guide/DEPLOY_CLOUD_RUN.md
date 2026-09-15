# ☁️ Cloud Run Deployment Guide for Instructors
### Hosting "The Midnight Runway Lockdown" on Google Cloud

This guide provides instructions to containerize and deploy the interactive escape room terminal (`index.html` + static assets) to **Google Cloud Run**, providing attendees with a public, low-latency HTTPS URL.

---

## ⚡ Quickest Method: 1-Line Deploy with `gcloud`

Google Cloud Run supports building and deploying directly from the source code without needing Docker installed locally:

```bash
gcloud run deploy maison-solaris-escaperoom \
  --source . \
  --region europe-west1 \
  --allow-unauthenticated \
  --port 8080 \
  --memory 256Mi \
  --min-instances 0 \
  --max-instances 5
```

Alternatively, run the automated deployment script included in the repository:
```bash
./deploy_cloud_run.sh
```

---

## 🐳 Option 2: Test Locally with Docker

To test the container on your local machine before pushing:

### 1. Build the Docker Image
```bash
docker build -t maison-solaris-escaperoom:latest .
```

### 2. Run Locally
```bash
docker run -d --name escaperoom -p 8080:8080 -e PORT=8080 maison-solaris-escaperoom:latest
```

### 3. Open in Browser
Visit **`http://localhost:8080`** to verify that:
- The countdown timer starts.
- Audio synthesis chimes and buzzers play.
- Chamber tabs switch seamlessly.
- Enter cipher `TITAN-54-18-950` into Chamber 01 to confirm validation.

### 4. Stop Local Container
```bash
docker stop escaperoom && docker rm escaperoom
```

---

## 🔒 Security & Anti-Cheat Protection

The included `.dockerignore` automatically excludes the `facilitator-guide/` directory from being built into the Docker container. This guarantees that:
- Workshop participants cannot view `SOLUTIONS_AND_SPOILERS.md` by guessing URLs on the deployed web server.
- The web server only serves `index.html`, `assets/`, and student-facing materials.

---

## 💰 Cost & Resource Profile

- **Cloud Run Scale-to-Zero**: When no workshop is taking place, `min-instances 0` scales the service down to 0 instances, incurring **$0.00 / month**.
- **Memory Footprint**: The `nginx:alpine` image runs with less than 20MB of RAM. A 256Mi allocation is more than sufficient for 100+ concurrent students.
- **Google Cloud Free Tier**: Covers up to 2 million requests and 360,000 vCPU-seconds per month, meaning running this workshop is virtually 100% free under standard tier usage.
