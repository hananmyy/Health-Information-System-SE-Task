const { Client } = require("../models");

module.exports = async (req, res) => {
  try {
    const clients = await Client.findAll(); // Fetch all clients from the database
    res.render("clients", { clients });
  } catch (error) {
    console.error("Error fetching clients:", error);
    res.render("clients", { clients: [], error: "Failed to load clients." });
  }
};