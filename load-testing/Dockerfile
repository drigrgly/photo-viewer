FROM python:3.11-alpine

WORKDIR /app

# Install Locust
RUN pip install --no-cache-dir locust

# Copy the locustfile
COPY locustfile.py .

# Expose ports for Locust web UI and worker
EXPOSE 8089

# Default command - runs locust with web UI
CMD ["locust", "-f", "locustfile.py", "--host", "http://photo-viewer-service:3000"]
