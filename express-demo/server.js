const config = require("config");
const express = require("express");
const startupDebug = require("debug")("app:startup");
const dbDebugger = require("debug")("app:db");
const helmet = require("helmet");
const morgan = require("morgan");
const Joi = require("joi");
const { logger } = require("./middleware/logger");
require("dotenv").config();
const environment = process.env.NODE_ENV;
const coursesRoute = require('./routes/courses');
const app = express();

app.use(express.json()); // built in middleware
app.use(helmet()); // built in middleware
app.use(express.urlencoded({ extended: true })); // built in middleware
app.use(express.static("public"));
app.use(logger);

app.use('/api/courses', coursesRoute)

// Configuration
// console.log("Application Name:", config.get("name"));
// console.log("Server Name:", config.get("mail.host"));
// console.log("Mail Password:", config.get("mail"));

console.log(process.env.DEBUG, environment);
if (environment === "development") {
  app.use(morgan("tiny")); // built in middleware
}
// eg. for db connection debugger
// dbDebugger("Connected to the db");

// Custom middleware function
app.use(function (req, res, next) {
  console.log("Authentication...");
  next(); // to pass to the next middleware without this the req would hang..
});

app.get("/", (req, res) => {
  res.send("Hello World");
});


app.listen(process.env.PORT, () => {
  console.log("LISTENING ON :", process.env.PORT);
});
