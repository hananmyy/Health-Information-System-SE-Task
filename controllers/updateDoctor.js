const { Doctor } = require("../models");

module.exports = async (req, res) => {
  try {
    const { name, email, speciality } = req.body;
    const doctorId = req.session.doctorId; // Ensure session contains doctor's ID

    if (!doctorId) {
      req.flash("error", "You must be logged in to update your profile.");
      return res.redirect("/auth/login");
    }

    // Update doctor record in the database
    await Doctor.update({ name, email, speciality }, { where: { id: doctorId } });

    req.flash("successMessage", "Profile updated successfully!");
    res.redirect("/doctorProfile");

  } catch (error) {
    console.error("Error updating doctor profile:", error);
    req.flash("error", "Something went wrong. Please try again.");
    res.redirect("/doctorProfile");
  }
};