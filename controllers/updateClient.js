const { Client } = require("../models");

module.exports = async (req, res) => {
  try {
    const { name, dob, email, gender, contact } = req.body;
    const clientId = req.params.id; // Get client ID from request params

    if (!clientId) {
      req.flash("error", "Invalid client ID.");
      return res.redirect("/clients");
    }

    // Update client details in the database
    await Client.update(
      { name, dob, email, gender, contact },
      { where: { id: clientId } }
    );

    req.flash("successMessage", "Client profile updated successfully!");
    res.redirect(`/client/${clientId}`);

  } catch (error) {
    console.error("Error updating client profile:", error);
    req.flash("error", "Something went wrong. Please try again.");
    res.redirect(`/client/${clientId}`);
  }
};