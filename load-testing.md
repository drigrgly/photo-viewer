# Load testing

## The base
For load testing, I'm using `locust`.

In the [`load-testing`](load-testing) folder, there are 3 files. A [`Dockerfile`](load-testing/Dockerfile) for creating the image, a [`locust-deployment.yaml`](load-testing/locust-deployment.yaml) which contains the required resources and the [`locustfile.py`](load-testing/locust-deployment.yaml) which `locust` uses.

For the load testing a test user is created in the application, the credentials for this user are set in the `LOAD_TEST_USER` and `LOAD_TEST_PASSWORD` environment variables.

The load testing uses two operations, a login, and getting all of the photos.