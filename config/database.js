const { Sequelize } = require("sequelize");
const mysql = require("mysql2/promise"); // For direct MySQL queries
const config = require("./config.js")[process.env.NODE_ENV || "development"];

// Create Sequelize instance (declared first)
const sequelize = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  dialect: config.dialect,
});

async function initializeDatabase() {
  try {
    // Create a temporary connection without specifying a database
    const connection = await mysql.createConnection({
      host: config.host,
      user: config.username,
      password: config.password,
    });

    // Create the database if it doesn't exist
    await connection.query(`CREATE DATABASE IF NOT EXISTS ${config.database};`);
    console.log(`Database '${config.database}' is ready`);

    // Close the temporary connection
    await connection.end();

    // Authenticate Sequelize AFTER ensuring the database exists
    await sequelize.authenticate();
    console.log("Sequelize connected to the database");

    await sequelize.sync({ force: false }); // Ensures tables are created
    console.log("Models synchronized");
  } catch (error) {
    console.error("Database initialization error:", error);
  }
}

// Start database initialization
initializeDatabase();

module.exports = sequelize; // Sequelize is now properly exported