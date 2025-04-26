const { Program } = require("../models");

module.exports = async (req, res) => {
  try {
    const doctorId = req.session.doctorId;
    const programs = await Program.findAll();

    res.render("programs", { programs, doctor: { id: doctorId } });

  } catch (error) {
    console.error("Error fetching programs:", error);
    req.flash("error", "Something went wrong.");
    res.redirect("/doctorProfile");
  }
};