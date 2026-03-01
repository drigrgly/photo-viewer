const tokenFunctions = require('./api/common/tokenHelper')

const express = require('express');
const cookieParser = require("cookie-parser");
const app = express();
const cors = require('cors');
const port = 3000;

require('dotenv').config({path:'./.ENV'})

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

app.use('/{*any}', 
  (req, res, next) => {
    res.send('There is nothing here');
  }
);

app.listen(port, () => {
  console.log(`Web server running on port ${port}`);
});