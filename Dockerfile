FROM node:current-alpine3.23 AS build

WORKDIR /app

# Build the frontend
COPY ../photo-viewer-frontend .
RUN ls -la
RUN npm install 
RUN npm run build

# -- Copy the built frontend to be served by the backend
FROM node:current-alpine3.23

WORKDIR /app

COPY ../photo-viewer-backend .
RUN npm install --omit=dev

COPY --from=build /app/dist/ ./client/

EXPOSE 3000

CMD ["node", "server.js"]
