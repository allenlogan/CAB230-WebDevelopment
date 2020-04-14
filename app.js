var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const swaggerUI = require('swagger-ui-express');
const swaggerDocument = require('./swagger/swagger.json');
const helmet = require('helmet');
const cors = require('cors');
const https = require('https');
const authenticationRouter = require('./routes/authenticationroutes');
const indexRouter = require('./routes/index');
const helpersRouter = require('./routes/helpers');

//Week 10 SSL and https
const fs = require('fs');
const privateKey = fs.readFileSync('./sslcert/cert.key','utf8');
const certificate = fs.readFileSync('./sslcert/cert.pem', 'utf8');
const credentials = {
  key: privateKey,
  cert: certificate
};
const server = https.createServer(credentials,app);
server.listen(443);
module.exports = app;
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//app.use(db);
app.use(logger('common'));
app.use(helmet());
app.use(cors());
//Logger and Logging
app.use(logger('dev'));
logger.token('req', (req,res) => JSON.stringify(req.headers))
logger.token('res', (req, res) => {
  const headers = {}
  res.getHeaderNames().map(h => headers[h] = res.getHeader(h))
  return JSON.stringify(headers)
})

const options = require('./knexfile.js');
const knex = require('knex')(options);

//Knew Setup
app.use((req, res, next) => {
  req.db = knex
  next()
})
//Create router links in the URL
app.use('/', indexRouter);
app.use('/', authenticationRouter);
app.use('/', helpersRouter);

app.use('/swagger', swaggerUI.serve, swaggerUI.setup(swaggerDocument))


app.get('/knex', function(req, res, next) {
  req.db.raw("SELECT VERSION()").then(
    (version) => console.log((version[0][0]))
  ).catch((er) => {console.log( err); throw err})
  res.send("Version Logged Successfully");
});


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
