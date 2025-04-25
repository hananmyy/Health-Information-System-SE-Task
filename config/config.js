// Load .env variables
require('dotenv').config();

module.exports = {
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: "medixsys_db",
    host: "localhost",
    dialect: "mysql"
  },
  test: {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: "medixsys_db",
    host: "localhost",
    dialect: "mysql"
  },
  production: {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: "medixsys_db",
    host: "localhost",
    dialect: "mysql"
  }
};