const bcrypt = require('bcrypt');
// const { Doctor } = require('../models');

module.exports = async (req, res) => {
  const { name, email, password, confirmPassword, specialization } = req.body;
  let validationErrors = [];

  try {
    // Validate
    if (!name || !email || !password || !confirmPassword || !specialization) {
      validationErrors.push("All fields are required");
    }

    if (password !== confirmPassword) {
      validationErrors.push("Passwords do not match");
    }

    const existing = await Doctor.findOne({ where: { email } });
    if (existing) {
      validationErrors.push("A doctor with this email already exists");
    }

    // If errors, flash and redirect
    if (validationErrors.length > 0) {
      req.flash('validationErrors', validationErrors);
      req.flash('data', req.body);
      return res.redirect('/auth/doctorRegister');
    }

    // Hash password and save
    const hashedPassword = await bcrypt.hash(password, 10);

    await Doctor.create({
      name,
      email,
      password: hashedPassword,
      specialization,
    });

    req.flash('successMessage', 'Registration successful! You can now log in.');
    res.redirect('/auth/login');
  } catch (error) {
    console.error('Error creating doctor:', error);
    validationErrors.push("Something went wrong. Try again.");
    req.flash('validationErrors', validationErrors);
    req.flash('data', req.body);
    res.redirect('/auth/doctorRegister');
  }
};
