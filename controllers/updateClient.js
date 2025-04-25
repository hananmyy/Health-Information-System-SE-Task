const { Client } = require("../models");
const moment = require("moment");

module.exports = async (req, res) => {
  try {
    const { name, dob, email, gender, contact } = req.body;
    const clientId = req.params.id;
    const doctorId = req.session.doctorId;

    console.log("Updating Client:", { clientId, name, dob, email, gender, contact });

    if (!doctorId) {
      req.flash("error", "You must be logged in to update a client's profile.");
      return res.redirect("/auth/login");
    }

    // Ensure the client belongs to the logged-in doctor
    const client = await Client.findOne({ where: { id: clientId, DoctorId: doctorId } });

    if (!client) {
      req.flash("error", "You are not authorized to update this client's profile.");
      return res.redirect("/clients");
    }

    // Format DOB correctly
    const formattedDob = dob && moment(dob, "YYYY-MM-DD").isValid() ? moment(dob).format("YYYY-MM-DD") : client.dob;

    // Perform update and capture affected rows
    const [affectedRows] = await Client.update(
      { name, dob: formattedDob, email, gender, contact },
      { where: { id: clientId } }
    );

    console.log("Rows Updated:", affectedRows); // Log affected rows

    if (affectedRows === 0) {
      req.flash("error", "No changes were made. Please check your inputs.");
    } else {
      req.flash("successMessage", "Client profile updated successfully!");
    }

    res.redirect(`/client/${clientId}`);

  } catch (error) {
    console.error("Error updating client profile:", error);
    req.flash("error", "Something went wrong. Please try again.");
    res.redirect(`/client/${clientId}`);
  }
};