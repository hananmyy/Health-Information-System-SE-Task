const { Client } = require("../models");
const path = require("path");

module.exports = async (req, res) => {
  try {
    const profilePicture = req.files.profilePicture;
    const clientId = req.params.id;
    const doctorId = req.session.doctorId; // Ensure doctor is logged in

    if (!doctorId) {
      req.flash("error", "You must be logged in to upload a client's profile picture.");
      return res.redirect("/auth/login");
    }

    // Ensure the client belongs to the logged-in doctor before uploading
    const client = await Client.findOne({ where: { id: clientId, DoctorId: doctorId } });

    if (!client) {
      req.flash("error", "You are not authorized to update this client's profile picture.");
      return res.redirect("/clients");
    }

    const uploadPath = path.resolve(__dirname, "../public/uploads", profilePicture.name);
    
    // Move the file to the uploads folder
    await profilePicture.mv(uploadPath);

    // Update the client's profile with the uploaded picture path
    await Client.update(
      { profilePicture: "/uploads/" + profilePicture.name },
      { where: { id: clientId } }
    );

    req.flash("successMessage", "Client profile picture uploaded successfully!");
    res.redirect(`/client/${clientId}`);

  } catch (error) {
    console.error("Error uploading profile picture:", error);
    req.flash("error", "Something went wrong. Please try again.");
    res.redirect(`/client/${clientId}`);
  }
};