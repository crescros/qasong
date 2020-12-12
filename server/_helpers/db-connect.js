var mysql = require('mysql');


var connection = mysql.createConnection({
  host: process.env.NODE_ENV === "development" ? process.env.DB_HOST_DEV : process.env.DB_HOST_PROD, // prod
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
});

module.exports = connection