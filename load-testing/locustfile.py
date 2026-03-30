from locust import HttpUser, task, between
import random

class PhotoViewerUser(HttpUser):
    """Simulates a photo viewer user interacting with the application"""
    
    wait_time = between(1, 3)  # Wait 1-3 seconds between tasks
    
    def on_start(self):
        """Register and login when the user starts"""
        self.register_and_login()
    
    def register_and_login(self):
        """Register a new user with unique credentials and login"""
        import random
        username = f"loadtest_{random.randint(100000, 999999)}"
        password = "TestPassword123!"
        
        # Register
        self.client.post(
            "/api/auth/register",
            json={"username": username, "password": password},
            name="/api/auth/register"
        )
        
        # Login
        response = self.client.post(
            "/auth/login",
            json={"username": username, "password": password},
            name="/auth/login"
        )
        
        # Store credentials for potential re-login
        self.username = username
        self.password = password

    @task(1)
    def get_all_photos(self):
        """Fetch all photos (most common operation)"""
        self.client.get("/api/photo", name="/api/photo [GET all]")

    @task(1)
    def get_specific_photo(self):
        """Fetch a specific photo by ID"""
        self.client.get("/api/photo/2", name="/api/photo/2 [GET]")

