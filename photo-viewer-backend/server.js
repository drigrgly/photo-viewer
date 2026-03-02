const tokenFunctions = require('./api/common/tokenHelper')

const express = require('express');
const cookieParser = require("cookie-parser");
const app = express();
const cors = require('cors');
const port = 3000;
const path = require('path');

require('dotenv').config({path:'./.env'})

app.use(express.json());
app.use(express.urlencoded());
app.use(cookieParser());
app.use(cors({credentials: true, origin: 'http://localhost:4200'}));

// Serve the uploaded picture
app.use("/uploads", express.static("uploads"))

const routes = require('./routes');

app.use(routes);

app.use((err, req, res, next) => {
  console.log(err);
  return res.status(401).send({error: err.message});
})

let distFolder = path.join(__dirname, "client/photo-viewer-frontend/browser")
app.use(express.static(distFolder));

app.get("/{*any}", (req, res) => {
  res.sendFile(path.join(distFolder, "index.html"))
})
app.listen(port, () => {
  console.log(`Web server running on port ${port}`);
});