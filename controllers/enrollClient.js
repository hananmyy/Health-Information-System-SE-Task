const { ClientPrograms, Program } = require("../models");

module.exports = async (req, res) => {
  try {
    const clientId = req.params.id; // ✅ Extract clientId correctly
    const programIds = req.body.programIds; // ✅ Handles multiple programs

    if (!programIds || programIds.length === 0) {
      req.flash("error", "Please select at least one program.");
      return res.redirect(`/client/${clientId}`);
    }

    // **Ensure ClientPrograms is properly defined**
    if (!ClientPrograms) {
      console.error("ClientPrograms model is missing.");
      req.flash("error", "Enrollment system error.");
      return res.redirect(`/client/${clientId}`);
    }

    // **Verify that selected programs exist**
    const validPrograms = await Program.findAll({ where: { id: programIds } });

    if (validPrograms.length !== programIds.length) {
      req.flash("error", "Some selected programs do not exist.");
      return res.redirect(`/client/${clientId}`);
    }

    // **Enroll client in selected programs**
    await Promise.all(
      programIds.map(programId => ClientPrograms.create({ ClientId: clientId, ProgramId: programId }))
    );

    req.flash("success", "Client successfully enrolled in selected programs.");
    res.redirect(`/client/${clientId}`);
  } catch (error) {
    console.error("Error enrolling client:", error);
    req.flash("error", "Enrollment failed.");
    res.redirect(`/client/${clientId}`);
  }
};