function dbindex() {

const Promise =  require('bluebird');
// const fs = require('fs');
var pgp = require('pg-promise')({promseLib: Promise});

var cn = {
  host: 'localhost', // Server name or IP address
  port: 5432, // Default post for PostgreSQL
  database: 'a_and_p',
  user: 'apeuser',
  password: '123'
};

var db = pgp(cn);
return db;

}

module.exports = dbindex();