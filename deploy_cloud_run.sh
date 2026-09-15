#!/usr/bin/env bash
# ==============================================================================
# Deploy Maison Solaris Escape Room to Google Cloud Run
# ==============================================================================
set -euo pipefail

# Configuration Defaults
SERVICE_NAME="${SERVICE_NAME:-maison-solaris-escaperoom}"
REGION="${REGION:-us-central1}"
PROJECT_ID="$(gcloud config get-value project 2>/dev/null || echo "")"

echo "======================================================================"
echo "🕶️  MAISON SOLARIS ESCAPE ROOM - CLOUD RUN DEPLOYMENT"
echo "======================================================================"

if [ -z "${PROJECT_ID}" ]; then
  echo "⚠️  No active Google Cloud project set in gcloud CLI."
  echo "Please set one using: gcloud config set project YOUR_PROJECT_ID"
  exit 1
fi

echo "Deploying to:"
echo "  - Project ID : ${PROJECT_ID}"
echo "  - Service    : ${SERVICE_NAME}"
echo "  - Region     : ${REGION}"
echo "----------------------------------------------------------------------"

# Deploy directly from source via Cloud Build & Cloud Run
echo "Building container and deploying to Cloud Run..."
gcloud run deploy "${SERVICE_NAME}" \
  --source . \
  --region "${REGION}" \
  --project "${PROJECT_ID}" \
  --platform managed \
  --allow-unauthenticated \
  --port 8080 \
  --min-instances 0 \
  --max-instances 5 \
  --memory 256Mi \
  --cpu 1 \
  --ingress all

echo "======================================================================"
echo "✅ DEPLOYMENT COMPLETE!"
URL="$(gcloud run services describe "${SERVICE_NAME}" --platform managed --region "${REGION}" --project "${PROJECT_ID}" --format='value(status.url)')"
echo "🌐 Live Escape Room URL: ${URL}"
echo "======================================================================"
