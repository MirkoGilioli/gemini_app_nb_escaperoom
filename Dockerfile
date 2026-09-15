# ==============================================================================
# Maison Solaris Luxury Eyewear Escape Room - Cloud Run Container
# ==============================================================================
# Multi-stage lightweight Nginx container configured for Google Cloud Run.
# Automatically binds to the Cloud Run injected $PORT environment variable.
# ==============================================================================

FROM nginx:1.27-alpine

LABEL maintainer="Maison Solaris Eyewear Workshop"
LABEL description="Interactive AI Escape Room Terminal for Google Cloud Run"

# Default fallback port if PORT is not set by Cloud Run
ENV PORT=8080

# Nginx alpine entrypoint automatically processes templates in /etc/nginx/templates/*.template
# via envsubst and places the output in /etc/nginx/conf.d/
COPY nginx.conf.template /etc/nginx/templates/default.conf.template

# Remove default static files
RUN rm -rf /usr/share/nginx/html/*

# Copy interactive mission control terminal and assets
COPY index.html /usr/share/nginx/html/
COPY assets/ /usr/share/nginx/html/assets/

# Copy downloadable workshop resources, guides, and PDF knowledge assets
COPY handouts/ /usr/share/nginx/html/handouts/
COPY gem-library/ /usr/share/nginx/html/gem-library/
COPY notebook-sources/ /usr/share/nginx/html/notebook-sources/
COPY rooms/ /usr/share/nginx/html/rooms/

# Expose standard Cloud Run port
EXPOSE 8080

# Run nginx in foreground
CMD ["nginx", "-g", "daemon off;"]
