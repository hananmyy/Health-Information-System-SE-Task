const { Client } = require('../models');

module.exports = async (req, res) => {
  const { name, dob, email, gender, contact } = req.body;
  let validationErrors = [];
  const doctorId = req.session.doctorId; // Get logged-in doctor's ID

  try {
    if (!doctorId) {
      req.flash("error", "You must be logged in as a doctor to register clients.");
      return res.redirect("/auth/login");
    }

    if (!name || !dob || !email || !gender || !contact) {
      validationErrors.push("All fields are required.");
    }

    const existing = await Client.findOne({ where: { email } });
    if (existing) {
      validationErrors.push("A client with this email already exists.");
    }

    if (validationErrors.length > 0) {
      req.flash('validationErrors', validationErrors);
      req.flash('data', req.body);
      return res.redirect('/doctorProfile'); // Keep the doctor on their profile page if registration fails
    }

    // Ensure the client is correctly linked to the doctor
    await Client.create({
      name,
      dob,
      email,
      gender,
      contact,
      DoctorId: doctorId // Assign doctor ID to client
    });

    req.flash('successMessage', 'Client registered successfully!');
    res.redirect('/clients'); // Redirect doctor to clients list

  } catch (error) {
    console.error('Error creating client:', error);
    validationErrors.push("Something went wrong. Try again.");
    req.flash('validationErrors', validationErrors);
    req.flash('data', req.body);
    res.redirect('/doctorProfile');
  }
};