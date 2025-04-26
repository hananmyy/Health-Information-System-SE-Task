const { Program } = require("../models");

module.exports = async (req, res) => {
  try {
    const doctorId = req.session.doctorId; // Get the logged-in doctor's ID
    const programs = await Program.findAll(); // Fetch all programs

    res.render("programs", { programs, doctor: { id: doctorId } });

  } catch (error) {
    console.error("Error fetching programs:", error);
    req.flash("error", "Something went wrong.");
    res.redirect("/doctorProfile");
  }
};