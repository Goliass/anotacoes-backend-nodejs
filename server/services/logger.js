const winston = require('winston');
const fs = require('fs');
const CustomDate = require('../utils/CustomDate');

// if it doesn't exist, create the logs folder
if (!fs.existsSync('logs')) {
  fs.mkdirSync('logs');
}

const format = winston.format;

const logger = winston.createLogger({
  format: format.combine(
    format.timestamp({
      format: CustomDate.timezonedTime}),
    format.json()
  ),
  transports: [
    new winston.transports.File({
      filename: 'logs/notes.log',
      maxsize: 1048576, // bytes
      maxFiles: 10
    })
  ]
});

module.exports = logger;