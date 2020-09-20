
const { Client } = require('pg')

// LOCAL
const client = new Client({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASS,
  port: process.env.DB_PORT,
})


// PRODUCTION
// const client = new Client({
//   user: process.env.DB_USER,
//   host: '/cloudsql/' + process.env.DB_INSTANCE,
//   database: process.env.DB_DATABASE,
//   password: process.env.DB_PASS,
//   port: process.env.DB_PORT,
// })

module.exports = client


