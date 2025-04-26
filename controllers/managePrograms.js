const { Program } = require('../models'); // make sure you import your Program model

module.exports = async (req, res) => {
  try {
    const doctorId = req.session.doctorId; // Logged-in doctor

    const programs = await Program.findAll({
      where: { DoctorId: doctorId }, // Fetch only programs by this doctor
    });

    res.render("programs", { doctor: { id: doctorId }, programs });
  } catch (error) {
    console.error("Error loading Manage Programs page:", error);
    req.flash("error", "Something went wrong.");
    res.redirect("/doctorProfile");
  }
};
