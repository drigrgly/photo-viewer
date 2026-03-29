# Load testing

In this, I'll go through the steps to add load balanicng to the application. I'm also going to include the results of the testing.

## The base
For load testing, I'm using `locust`.

In the [`load-testing`](load-testing) folder, there are 3 files. A [`Dockerfile`](load-testing/Dockerfile) for creating the image, a [`locust-deployment.yaml`](load-testing/locust-deployment.yaml) which contains the required resources and the [`locustfile.py`](load-testing/locust-deployment.yaml) which `locust` uses.

For the load testing a test user is created in the application, the credentials for this user are set in the `LOAD_TEST_USER` and `LOAD_TEST_PASSWORD` environment variables.

The load testing uses two operations, a login, and getting all of the photos.

## Reaching the locust UI

To be able to reach the locust UI, we have to expose the service, more specifically the 8089 port. In OpenShift, we can do this by creating a new Route.
![alt text](images/locust-route.png)

## The testing

Initially we can see that only one pod is running:
![alt text](images/initial.png)