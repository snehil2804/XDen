// Import required modules and dependencies
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const expressSession = require('express-session');

// Import the route modules
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

// Import the Passport.js module for authentication
const passport = require('passport');

// Create an instance of the Express.js application
var app = express();

// Set up the view engine and views location
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Initialize and configure the session middleware
app.use(expressSession({
  resave: false,
  saveUninitialized: false,
  secret:'secret'
}));

// Initialize Passport.js and its session handling
app.use(passport.initialize());
app.use(passport.session());

// Configure Passport.js user serialization and deserialization
// (This is where we tell Passport.js how to identify users in sessions)
passport.serializeUser(usersRouter.serializeUser());
passport.deserializeUser(usersRouter.deserializeUser());

// Set up the logger middleware for development debugging
app.use(logger('dev'));

// Parse JSON and URL encoded data in request bodies
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Parse cookies in requests
app.use(cookieParser());

// Set up static file serving from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Mount the indexRouter and usersRouter modules at the root and '/users' routes
app.use('/', indexRouter);
app.use('/users', usersRouter);

// Catch 404 errors and forward to the error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// Set up the custom error handler middleware
app.use(function(err, req, res, next) {
  // Set locals (response properties), only providing error details in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development'? err : {};

  // Render the error page
  res.status(err.status || 500);
  res.render('error');
});

// Specify the port for the server to listen on
const PORT = process.env.PORT || 3000;

// Start the server and log a message on successful startup
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Export the application instance for use in other modules
module.exports = app;