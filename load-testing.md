# Load testing

In this, I'll go through the steps to add load balanicng to the application. I'm also going to include the results of the testing.

## The base
For load testing, I'm using `locust`.

In the [`load-testing`](load-testing) folder, there are 3 files. A [`Dockerfile`](load-testing/Dockerfile) for creating the image, a [`locust-deployment.yaml`](load-testing/locust-deployment.yaml) which contains the required resources and the [`locustfile.py`](load-testing/locust-deployment.yaml) which `locust` uses.

### The new resource

The [`locust-deployment.yaml`](load-testing/locust-deployment.yaml) contains 3 resources, a deployment for the locust master, one for the worker, and a service allowing connectivity.

The worker deployment contains 3 pods for allowing larger load testing.

The above mentioned setup can be seen in the topology view:

![alt text](images/locust-topo.png)


### Simulating user actions
For simulating user action, each locust simulated user registers and logs in, then with 50-50 chance they get a specific picture, requiring IO operation, or request information about all the pictures.

### Modifying the resource limits

In order to better see the scaling behavior I modified the resource requests and limits for the `photo-viewer` app for the following:
- CPU:
  - request: 100m
  - limit: 200m
- Memory
  - request: 128Mi
  - limit: 256Mi

## Reaching the locust UI

To be able to reach the locust UI, we have to expose the service, more specifically the 8089 port. In OpenShift, we can do this by creating a new Route.
![alt text](images/locust-route.png)

## The testing

Initially we can see that only one pod is running:
![initial state](images/initial.png)

On the locust UI we can parameterize how many users we want, and in what rate should they spawn. For this I've used 100 users, with a 10 user/second spawn rate. The host is given in the manifest itself, but we can also supply it here if we want to.

![locust ui](images/locust.png)

With this setup, we can see in the topology view, that the pod count increased in the response of the load:
![first test](images/first-test.png)

After the load is no longer present, the deployment automatically scales back down to only one pod:

We can see the pod terminating here
![termination](images/termination.png)

## Findings with 1000 users
We can see, that the pod count increases to 3
![pod count](images/locust-1000.png)

For some reason the register and login endpoints fail, this results in many fails in the first part of the load test 

![locust chart](images/locust-chart.png)


On the metrics tab, we can see the pods increasing as the load gets bigger:
![pod scaling](images/pod-increase.png)


Type | Name | # Requests | # Fails | Median (ms) | 95%ile (ms) | 99%ile (ms) | Average (ms) | Min (ms) | Max (ms) | Average size (bytes) | Current RPS | Current Failures/s
-----|------|------------|---------|-------------|-------------|-------------|--------------|----------|----------|----------------------|-------------|-------------------
POST | /auth/login | 567 | 567 | 110 | 67000 | 108000 | 9043.19 | 3 | 148080 | 12.69 | 0.8 | 0.8
GET | /api/photo/2 [GET] | 2048 | 33 | 130 | 1100 | 31000 | 889.15 | 2 | 81639 | 157.93 | 0.2 | 0.2
GET | /api/photo [GET all] | 2738 | 11 | 190 | 800 | 1100 | 266.73 | 2 | 1291 | 2497.92 | 0.8 | 0
POST | /auth/register | 7291 | 7291 | 890 | 1800 | 2300 | 852.72 | 4 | 2912 | 27.32 | 0 | 0
 | Aggregated | 12644 | 7902 | 520 | 1700 | 10000 | 1099.02 | 2 | 148080 | 582.82 | 1.8 | 