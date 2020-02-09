const mysql  = require('mysql');
const login = require('./login');

function createDBConnection() {
  return mysql.createConnection(login);
}

module.exports = createDBConnection;