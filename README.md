# Photo viewer webapp (In development)

A simple application made for a university course.



## Deploying the application yourself
There are multiple ways you can deploy this application yourself

### 1. Deveopment

#### Environment variables
In order for the application to work, you have to define the following variables:
```env
DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME, JWT_TOKEN_SECRET, JWT_REFRESH_TOKEN_SECRET,
```
You can define these variables in a .env file, located in the root of the backend application, you can find a template called [example-env](photo-viewer-backend/example-env) to help you.

#### Preparing the database
The backend is set up to use a MySQL database, to initialize the db, import the .sql files [photo-viewer-backend/db/create-db-user.sql](photo-viewer-backend/db/create-db-user.sql) and [photo-viewer-backend/db/create-db.sql](photo-viewer-backend/db/create-db.sql). Make sure to replace the values indicated by ```${VARIABLE}``` to your desired values, these should be the ```DB_USER```, ```DB_NAME``` and ```DB_PASSWORD```.

#### Preparing the application
Make sure you install all the dependencies. In order to do this, use ```npm install``` in the root folder of the [frontend](photo-viewer-frontend) and the [backend](photo-viewer-backend)

During development you can use the ```npm start``` command in both folders, to start the angular development server, and the express.js application

The ```npm start``` in the frontend application run the ```ng serve``` with ```--proxy-config proxy.config.json```, this way we don't have to worry about whether the frontend is being hosted by the angular development server or our backend.

### 2. Deploying the application

**Manual way**

To deploy manually, you can run the command ```npm run build``` in the frontend folder, this will create a build under the folder *dist*. Copy the contents of this folder over to photo-viewer-backend/client. Now if you launch the backend, you can reach the application through express itself.


**Kubernetes**

The [Dockerfile](Dockerfile) is set up to create an image, containing the bundled application, built similarly to the manual way. 

To build the image, run the following command from the root of the repository:
```console
docker build -t localhost/photo-viewer .
```

The deployment is retrieving the needed variables from a Secrets resource. You can find an example for this in [secret-example.yaml](secret-example.yaml). In order to prevent the secret file from accidentally getting pushed to the repository, rename it to secret.yaml, this way the .gitignore will automatically ignore it.

The values must be in base64, in order to encode your plain string variables, you can use the following command:
```console
echo -n "variable" | base64
```

After these preparations you can apply the files in this order:
```console
kubectl apply -f secret.yaml
kubectl apply -f deploy.yaml
```
If everything went right you should see two pods starting up.

To see the external IP where you can reach your application, use:
```console
kubectl get svc -n photo-viewer
```

## Current deployment configuration

> you can reach the application here: [https://photo-viewer-photo-viewer.apps.okd.fured.cloud.bme.hu/](https://photo-viewer-photo-viewer.apps.okd.fured.cloud.bme.hu/)

In an openshift environment, a BuildConfig is set up to track the updates from the repository.
In case of an update, it creates an image from the **[Dockerfile](Dockerfile)**

As of now, the deployment configuration itself is static, meaning, in order to change it, we have to import it again using the OpenShift dashboard.

# Future developments
- Adding more feedback towards the user to enhance user experience
- Separating the authentication server and the backend server for more scalability
- Further automating the deployment process
- Ensuring persistency is working as expected