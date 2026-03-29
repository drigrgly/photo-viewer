from locust import HttpUser, task, between
import random

class PhotoViewerUser(HttpUser):
    """Simulates a photo viewer user interacting with the application"""
    
    wait_time = between(1, 3)  # Wait 1-3 seconds between tasks
    
    def on_start(self):
        """Login when the user starts"""
        self.login()
    
    def login(self):
        """Login with existing credentials"""
        username = self.get_secret("LOAD_TEST_USER")
        password = self.get_secret("LOAD_TEST_PASSWORD")

        # Login
        response = self.client.post(
            "/api/auth/login",
            json={"username": username, "password": password},
            name="/api/auth/login"
        )
        
        # Store credentials for potential re-login
        self.username = username
        self.password = password

    @task(1)
    def get_all_photos(self):
        """Fetch all photos (most common operation)"""
        self.client.get("/api/photo", name="/api/photo [GET all]")

