const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const dotenv=require('dotenv');

const userRoute=require("./route/user");

dotenv.config({path: './config/config.env'});

const app = express();
app.use(express.json());

mongoose
  .connect(

"mongodb+srv://locat:9877@cluster0.vygea11.mongodb.net/location?retryWrites=true&w=majority",
    // "mongodb+srv://location:1234@cluster0.qufy3.mongodb.net/location?retryWrites=true&w=majority",
  // "mongodb://localhost:27017/Database", 
  { useNewUrlParser: true, useUnifiedTopology: true,/* useCreateIndex: true */}
  )
  .then(() => {
    console.log("Connected to database!");
  })
  .catch((e) => {
    console.log("Connection failed!" + e);
  });

app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));
//app.use("/images", express.static(path.join("backend/images")));
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept,Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST,PUT,PATCH, DELETE, OPTIONS"
  );
  next();
});

// app.use("/api/posts", postRoutes);
app.use("/api/user",userRoute);
app.use("/api/locats", require('./route/locats'));
app.use("/api/contant",require('./route/contactLists'));


app.all('*', (req, res, next) => {
  res.status(404).json({
    status: 'fail',
    message: `Can't find ${req.originalUrl} on this server!`
  });
});

module.exports = app;
