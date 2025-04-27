const { ClientPrograms, Program } = require("../models");

module.exports = async (req, res) => {
  try {
    const clientId = req.params.id; // ✅ Ensure clientId is extracted from URL parameters
    const programIds = req.body.programIds; // ✅ Allow multiple program selections
    const doctorId = req.session.doctorId; // ✅ Ensure DoctorId is retrieved from session

    // **Check if program selection is empty**
    if (!programIds || programIds.length === 0) {
      req.flash("error", "Please select at least one program.");
      return res.redirect(`/client/${clientId}`);
    }

    // **Check if ClientPrograms model exists**
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

    // **Ensure DoctorId is NOT NULL**
    if (!doctorId) {
      req.flash("error", "Doctor not found. Please log in.");
      return res.redirect(`/auth/login`);
    }

    // **Enroll client in selected programs with DoctorId**
    await Promise.all(
      programIds.map(programId =>
        ClientPrograms.create({
          ClientId: clientId,
          ProgramId: programId,
          DoctorId: doctorId, // ✅ Fix: Pass the doctor’s ID
        })
      )
    );

    req.flash("success", "Client successfully enrolled in selected programs.");
    res.redirect(`/client/${clientId}`);
  } catch (error) {
    console.error("Error enrolling client:", error);
    req.flash("error", "Enrollment failed.");
    res.redirect(`/client/${clientId}`);
  }
};