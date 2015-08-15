'use strict';

/*
 * Initialize, configure, and run the express application.
 */

import express from 'express';
import bodyParser from 'body-parser';
import logger from 'morgan';
import methodOverride from 'method-override';
import path from 'path';

import * as config from '../config';
const app = express();

// Add logging
app.use(logger('dev'));

// Setup serverside views
app.set('views', './views');
app.set('view engine', 'jade');

// Expose static files as residing at top-level domain
//app.use(express.static(path.join(__dirname, '../client/assets')))

// Configure to get all data from request bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride());

// Set indent level for prettifying json responses
app.set('json spaces', 2);

// -------
// Routing
// -------

import apiRouter from './api/dup.api';
import tracingRouter from './api/tracing.api';

app.get('/', function(req, res) {
  res.send('Hello world!<br/>xoxo, Nick');
});

app.use('/api/', apiRouter);
app.use('/tracing', tracingRouter);

// Catch 404 errors and forward to error handler
app.use(function(req, res, next) {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// --------------
// Error handlers
// --------------

// Development error handler
// prints stack trace
if (app.get('env') === 'development') {
  console.log('Running in development environment');
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// Production error handler, no stacktrace
app.use(function(err, req, res ,next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

// Finally, run the application
var server = app.listen(config.port, config.host, function() {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Portfolio running at http://%s:%s', host, port);
});

export default server;
