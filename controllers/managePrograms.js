const { Program, Doctor } = require("../models");

module.exports = async (req, res) => {
  try {
    const doctorId = req.session.doctorId; // Logged-in doctor

    // Fetch doctor details
    const doctor = await Doctor.findByPk(doctorId);
    if (!doctor) {
      req.flash("error", "Doctor not found.");
      return res.redirect("/auth/login");
    }

    // Fetch only programs created by this doctor
    const programs = await Program.findAll({ where: { DoctorId: doctorId } });

    res.render("programs", { doctor, programs });
  } catch (error) {
    console.error("Error loading Manage Programs page:", error);
    req.flash("error", "Something went wrong.");
    res.redirect("/doctorProfile");
  }
};