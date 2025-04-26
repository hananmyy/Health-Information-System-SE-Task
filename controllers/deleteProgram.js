const { Program } = require("../models");

module.exports = async (req, res) => {
  try {
    const programId = req.params.id;
    const doctorId = req.session.doctorId;

    const program = await Program.findByPk(programId);

    if (!program) {
      req.flash("error", "Program not found.");
      return res.redirect("/programs");
    }

    if (program.DoctorId !== doctorId) {
      req.flash("error", "You can only delete programs you created.");
      return res.redirect("/programs");
    }

    await program.destroy();

    req.flash("successMessage", "Health program deleted successfully!");
    res.redirect("/programs");

  } catch (error) {
    console.error("Error deleting program:", error);
    req.flash("error", "Something went wrong.");
    res.redirect("/programs");
  }
};