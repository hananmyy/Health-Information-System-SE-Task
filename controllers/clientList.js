const { Client, Doctor } = require('../models');

module.exports = async (req, res) => {
  try {
    const doctorId = req.session.doctorId;

    if (!doctorId) {
      req.flash("error", "You must be logged in to view clients.");
      return res.redirect("/auth/login");
    }

    const clients = await Client.findAll({
      where: { DoctorId: doctorId },
      include: [{ model: Doctor, as: "doctor", attributes: ["name", "email", "speciality"] }],
      attributes: ["id", "name", "dob", "email", "contact", "gender"]
    });

    res.render("clients", { clients });

  } catch (error) {
    console.error("Error fetching clients:", error);
    req.flash("error", "Failed to load clients.");
    res.redirect("/doctorProfile");
  }
};