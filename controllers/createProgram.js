const { Program } = require("../models");

module.exports = async (req, res) => {
  try {
    const { name, description } = req.body;
    const doctorId = req.session.doctorId;

    if (!doctorId) {
      req.flash("error", "You must be logged in to create a program.");
      return res.redirect("/auth/login");
    }

    await Program.create({ name, description, DoctorId: doctorId });

    req.flash("successMessage", "Health program created successfully!");
    res.redirect("/programs");

  } catch (error) {
    console.error("Error creating program:", error);
    req.flash("error", "Something went wrong.");
    res.redirect("/programs");
  }
};