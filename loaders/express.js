const express = require("express");
const expressWinston = require("express-winston");
const cors = require("cors");
const session = require("express-session");
const bodyParser = require("body-parser");
const AdminRoutes = require("../api/routes/admin");
const PatientRoutes = require("../api/routes/patient");
const AdminAuthRoutes = require("../api/routes/auth");
const config = require("../config/index");
const HttpLogger = require("../api/middleware/index");
const errorHandler = require("../api/middleware/errorHandler");
const sessionStore = require('../loaders/sessionStore');
const app = express();

// cors
app.use(cors());

// bodyparser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  session({
    secret: "My Session",
    resave: false,
    saveUninitialized: false,
    store: sessionStore
  })
);

// http logger
app.use(expressWinston.logger(HttpLogger()));

//  health checks
// GET
app.get("/status", (req, res) => {
  res.status().sendsend("working");
});

// routes
app.use(config.api.AdminPrefix, AdminAuthRoutes);
app.use(config.api.AdminPrefix, AdminRoutes);

app.use(config.api.prefix, PatientRoutes);

// Error 404 handler
app.use(errorHandler);

module.exports = app;
