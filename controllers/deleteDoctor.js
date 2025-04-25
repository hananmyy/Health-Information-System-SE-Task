const { Doctor } = require("../models");

module.exports = async (req, res) => {
  try {
    const doctorId = req.session.doctorId;

    if (!doctorId) {
      req.flash("error", "You must be logged in to delete your profile.");
      return res.redirect("/auth/login");
    }

    await Doctor.destroy({ where: { id: doctorId } });

    // Destroy session and ensure redirect happens after cleanup
    req.session.destroy((err) => {
      if (err) {
        console.error("Error destroying session:", err);
        req.flash("error", "Something went wrong. Please try again.");
        return res.redirect("/doctorProfile");
      }
      
      req.flash("successMessage", "Doctor profile deleted successfully!");
      res.redirect("/");
    });

  } catch (error) {
    console.error("Error deleting doctor profile:", error);
    req.flash("error", "Something went wrong. Please try again.");
    res.redirect("/doctorProfile");
  }
};