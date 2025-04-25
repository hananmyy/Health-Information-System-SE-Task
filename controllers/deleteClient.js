const { Client } = require("../models");

module.exports = async (req, res) => {
  try {
    const clientId = req.params.id;
    const doctorId = req.session.doctorId; // Verify logged-in doctor

    if (!doctorId) {
      req.flash("error", "You must be logged in to delete a client.");
      return res.redirect("/auth/login");
    }

    // Ensure the client belongs to the logged-in doctor before deleting
    const client = await Client.findOne({ where: { id: clientId, DoctorId: doctorId } });

    if (!client) {
      req.flash("error", "You are not authorized to delete this client.");
      return res.redirect("/clients");
    }

    await Client.destroy({ where: { id: clientId } });

    req.flash("successMessage", "Client deleted successfully!");
    res.redirect("/clients");

  } catch (error) {
    console.error("Error deleting client:", error);
    req.flash("error", "Something went wrong. Please try again.");
    res.redirect("/clients");
  }
};