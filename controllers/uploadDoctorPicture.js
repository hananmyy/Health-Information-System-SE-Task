const { Doctor } = require("../models");
const path = require("path");

module.exports = async (req, res) => {
  try {
    const profilePicture = req.files.profilePicture;
    const doctorId = req.session.doctorId; // Ensure doctor is logged in

    if (!doctorId) {
      req.flash("error", "You must be logged in to upload a profile picture.");
      return res.redirect("/auth/login");
    }

    const uploadPath = path.resolve(__dirname, "../public/uploads", profilePicture.name);
    
    // Move the file to the uploads folder
    await profilePicture.mv(uploadPath);

    // Update the doctor's profile with the uploaded picture path
    await Doctor.update(
      { profilePicture: "/uploads/" + profilePicture.name },
      { where: { id: doctorId } }
    );

    req.flash("successMessage", "Profile picture uploaded successfully!");
    res.redirect("/doctorProfile");

  } catch (error) {
    console.error("Error uploading profile picture:", error);
    req.flash("error", "Something went wrong. Please try again.");
    res.redirect("/doctorProfile");
  }
};