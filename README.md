# Photo viewer webapp
> you can reach the application here (as for now): [https://photo-viewer-photo-viewer.apps.okd.fured.cloud.bme.hu/](https://photo-viewer-photo-viewer.apps.okd.fured.cloud.bme.hu/)


A simple application made for a university course.

**Table of contents**

1. [Architecture](#architecture) 
2. [Deployments](#deployments)
3. [Future developments](#future-developments)

# Architecture

## Authentication and authorization

The application uses JWT tokens to authenticate the users. The tokens bear the current user's ID so we can perform authorization easily. The JWT authentication method is utilized in order for the backend to become as stateless as possible, this way multiple backends can be deployed without having to share the stored sessions between themselves.

The JWT tokens are set using cookies, this way we can prevent tampering on the client side.
## Application architecture

The application consists of three main parts:
1. [Frontend](#frontend)
2. [Backend](#backend)
3. [Database](#database)

### Frontend
The frontend is implemented using Angular. It communicates with the backend using REST API endpoints, for sending the requests HttpClient wrapper services are utilized for ease of use.

### Backend
The backend uses ExpressJS over NodeJS. On one hand, it functions as the authentication server, handling register, login and token refresh requests. It also has REST API endpoints that allow us to serve the functional requests, such as photo uploading, deleting etc.

The backend also communicates with the database, allowing us to store the user data persistently. The storage of the files are achieved locally, storing only the path of the photos in the database.

### Database
For the database I'm using MySQL, as it is more than adequate for our use-cases and it is simple to set up with containers.

## Typical flow

First, the user has to authenticate themselves
```
Frontend |------------[Login request]------------>| Backend
         |                                        |     
         |               [200 OK]                 | 
         |<--[Set cookies containing JWT tokens]--| #login is successful        
```

After the successful login, on every request the cookies get sent back to the server, next to the actual request. The server checks if the JWT token is valid inside the cookie. If it is it proceeds processing the request, else it responds with an unauthorized error.

**Valid JWT**
```
Frontend |---------------[request]--------------->| Backend
         |                                        | - Check JWT token    
         |                                        | - Process request
         |<----------[Send back response]---------| 
```

**Invalid JWT**
```
Frontend |---------------[request]--------------->| Backend
         |                                        | - Check JWT token    
         |                                        | - Token is invalid
         |<----------[401 Unauthorized]-----------| 
```

As we don't have a session the logout is not as simple as just destroying the session.
On logout we have to delete the cookies used, this way the client no longer has a valid JWT for the requests. We can also store the JWT on a blacklist, this way, if a malicious side has access to the JWT it will no longer be able to use it, this is unimplemented as of now.

**Logout**
```
Frontend |------------[logout request]----------->| Backend
         |                                        | 
         |                 [200 OK]               | 
         |<--------[Clear the cookies used]-------| #logout is successful        
```



# Deployments

## CICD configuration

I'm using OpenShift for deploying the application.

A BuildConfig resource is set, working together with with GitHub webhooks to "monitor" the repository for changes.

When it detects that the repository has been updated, it creates a container image from the **[Dockerfile](Dockerfile)**

This newly created image is then used in the deployment of the pods, this way the newest version will be available automatically.

## Deploying the application yourself
There are multiple ways you can deploy this application yourself

### 1. Development

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

The pods use PresistenVolumeClaims for persistency. You may need to supply them with a backing PresistentVolume.

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

# Future developments
- Adding more feedback towards the user to enhance user experience
- Separating the authentication server and the backend server for more scalability
- Further automating the deployment process