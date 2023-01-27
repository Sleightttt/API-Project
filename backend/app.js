const express = require("express");
require("express-async-errors");
const morgan = require("morgan");
const cors = require("cors");
const csurf = require("csurf");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");
const routes = require("./routes");
const { environment } = require("./config");
const isProduction = environment === "production";
const { ValidationError } = require("sequelize");

const app = express();

app.use(morgan("dev"));

app.use(cookieParser());
app.use(express.json());

// Security Middleware
if (!isProduction) {
  // enable cors only in development
  app.use(cors());
}

// helmet helps set a variety of headers to better secure your app
app.use(
  helmet.crossOriginResourcePolicy({
    policy: "cross-origin",
  })
);

// Set the _csrf token and create req.csrfToken method
app.use(
  csurf({
    cookie: {
      secure: isProduction,
      sameSite: isProduction && "Lax",
      httpOnly: true,
    },
  })
);

app.use(routes);

//error handler if no routes found
app.use((_req, _res, next) => {
  const err = new Error("The requested resource couldn't be found.");
  err.title = "Resource Not Found";
  err.errors = ["The requested resource couldn't be found."];
  err.status = 404;
  next(err);
});

app.use((err, _req, _res, next) => {
  // check if error is a Sequelize error:
  if (err instanceof ValidationError) {
    err.errors = err.errors.map((e) => e.message);
    err.title = "Validation error";
  }
  next(err);
});

app.use((err, _req, res, _next) => {
  // sign in errors;
  // if (
  //   err.errors.includes("Please provide a valid email or username.") ||
  //   err.errors.includes("Please provide a password.")
  // ) {
  //   let error = {};
  //   if (err.errors.includes("Please provide a valid email or username.")) {
  //     error.credential = "Email or username is required";
  //   }
  //   if (err.errors.includes("Please provide a password.")) {
  //     error.password = "Password is required";
  //   }

  //   res.status = 400;
  //   return res.json({
  //     message: "Validation error",
  //     statusCode: 400,
  //     error,
  //   });
  // }
  // //sign up errors
  // if (err.errors.includes("email must be unique")) {
  //   res.status = 403;
  //   return res.json({
  //     message: "User already exists",
  //     statusCode: 403,
  //     errors: {
  //       email: "User with that email already exists",
  //     },
  //   });
  // }

  // if (err.errors.includes("username must be unique")) {
  //   res.status = 403;
  //   return res.json({
  //     message: "User already exists",
  //     statusCode: 403,
  //     errors: {
  //       username: "User with that username already exists",
  //     },
  //   });
  // }

  // if (err.message === "Bad request.") {
  //   res.status = 400;
  //   let error = {};
  //   error.message = "Validation error";
  //   error.statusCode = 400;
  //   console.log(err.errors);
  //   if (
  //     err.errors.includes(
  //       "Please provide a firstName with at least 1 characters."
  //     )
  //   ) {
  //     error.firstName = "First name is required";
  //   }

  //   if (
  //     err.errors.includes(
  //       "Please provide a lastName with at least 1 characters."
  //     )
  //   ) {
  //     error.lastName = "Last name is required";
  //   }
  //   if (
  //     err.errors.includes(
  //       "Please provide a username with at least 4 characters."
  //     )
  //   ) {
  //     error.username = "username name is required";
  //   }

  //   if (err.errors.includes("Please provide a valid email.")) {
  //     error.email = "Invalid email";
  //   }

  //   if (err.errors.includes("Please provide an address.")) {
  //     error.address = "Street address is required";
  //   }
  //   if (err.errors.includes("Please provide a city")) {
  //     error.city = "City is required";
  //   }
  //   if (err.errors.includes("Please provide a state.")) {
  //     error.state = "State is required";
  //   }
  //   if (err.errors.includes("Please provide a country.")) {
  //     error.country = "Country is required";
  //   }
  //   if (err.errors.includes("Please provide latitude.")) {
  //     error.lat = "Latitude is not valid";
  //   }
  //   if (err.errors.includes("Please provide longitude.")) {
  //     error.lng = "Longitude is not valid";
  //   }
  //   if (err.errors.includes("Please provide a name.")) {
  //     error.name = "Name is required and must be less than 50 characters";
  //   }
  //   if (err.errors.includes("Please provide a description.")) {
  //     error.description = "Description is required";
  //   }
  //   if (err.errors.includes("Please provide a price.")) {
  //     error.price = "Price per day is required";
  //   }

  //   if (err.errors.includes("Please provide a review")) {
  //     error.review = "review text is required";
  //   }

  //   if (err.errors.includes("Please provide a star rating")) {
  //     error.stars = "Stars must be an integer from 1-5";
  //   }

  //   if (err.errors.includes("Please provide a start date")) {
  //     error.startDate = "Please provide a start date";
  //   }

  //   if (err.errors.includes("Please provide an end date")) {
  //     error.endDate = "Please provide an end date";
  //   }
  //   if (err.errors.includes("max price must be above 0")) {
  //     error.endDate = "Max price must be above 0";
  //   }

  //   return res.json(error);
  // }

  res.status(err.status || 500);
  console.error(err);
  res.json({
    title: err.title || "Server Error",
    message: err.message,
    errors: err.errors,
    stack: isProduction ? null : err.stack,
  });
});

module.exports = app;
