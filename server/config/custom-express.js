const express = require('express');
const routes = require('../routes/routes');

const httpStatus = require('../utils/httpStatus');

const logger = require('../services/logger');

const helmet = require('helmet');

const app = express();

app.use(helmet());

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use(routes);

app.use(function(req, res, next) {
  logger.info(`Resource '${req.path}' not found`);

  return res.status(httpStatus.notFound).end();
});

app.use(function(error, req, res, next) {
  logger.error('' + error); // with '' (string) the error description log is better
  console.log(error);
  
  return res.status(httpStatus.internalServerError).end();
}); 

module.exports = app;