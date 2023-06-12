// Importing Modules
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const compression = require("compression");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

// Configure Environment Variables
require("dotenv").config();

// Initialing express
const app = express();

// Database Connection
require("./config/connection");

// JSON Parser
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

// Enable CORS
app.use(cors());
app.use(compression());

// Helmet Security Headers
app.use(helmet());

const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 100, // 100 requests,
});
app.use(limiter);

// Importing Routers
const indexRouter = require("./routes/index");

// Routing Middlewares
app.use("/v1/", indexRouter);

/* Error Handling Middleware */
app.use(function (err, req, res, next) {
  res.status(err.status || 500).json({
    message: "Internal Server Error",
  });
});

// Server port listener
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Application is running on port ${PORT}`);
});
