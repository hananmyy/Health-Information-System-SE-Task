const { Sequelize } = require("sequelize");
const mysql = require("mysql2/promise"); // Allows direct MySQL queries for initialization
const config = require("./config.js")[process.env.NODE_ENV || "development"];

let sequelize;

// ✅ Handle Railway production environment
if (process.env.NODE_ENV === "production" && process.env.DATABASE_URL) {
  sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: "mysql",
    port: process.env.DB_PORT || 3306, // ✅ Explicitly set port
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false, // ✅ Ensures SSL compatibility
      },
    },
  });
} else {
  // ✅ Handle local development/test environment
  sequelize = new Sequelize(config.database, config.username, config.password, {
    host: config.host,
    dialect: config.dialect,
    port: config.port || 3306, // ✅ Explicitly set port
  });
}

// ✅ Ensure database exists before connecting
async function initializeDatabase() {
  try {
    if (process.env.NODE_ENV !== 'production') {
      const connection = await mysql.createConnection({
        host: config.host,
        user: config.username,
        password: config.password,
      });

      await connection.query(`CREATE DATABASE IF NOT EXISTS ${config.database};`);
      console.log(`Database '${config.database}' is ready.`);
      await connection.end();
    }

    await sequelize.authenticate();
    console.log("Sequelize connected to the database.");

    await sequelize.sync({ force: false }); // ✅ Ensures tables exist without dropping data
    console.log("Models synchronized.");
  } catch (error) {
    console.error("Database initialization error:", error);
  }
}

// ✅ Start database initialization
initializeDatabase();

module.exports = sequelize;