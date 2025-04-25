const bcrypt = require('bcrypt');
const { Doctor } = require('../models');

module.exports = async (req, res) => {
  const { email, password } = req.body;

  console.log('Login attempt:', { email });

  if (!email || !password) {
    req.flash('error', 'Please fill in all fields.');
    return res.redirect('/auth/login');
  }

  try {
    const doctor = await Doctor.findOne({ where: { email } });

    if (!doctor) {
      req.flash('error', 'Doctor not found.');
      return res.redirect('/auth/login');
    }

    const isPasswordValid = await bcrypt.compare(password, doctor.password);

    if (!isPasswordValid) {
      req.flash('error', 'Invalid email or password.');
      return res.redirect('/auth/login');
    }

    // Save doctor ID to session
    req.session.doctorId = doctor.id;
    req.flash('successMessage', 'Login Successful! Welcome back.');
    return res.redirect('/doctorProfile');

  } catch (err) {
    console.error('Login error:', err);
    req.flash('error', 'Something went wrong. Please try again.');
    return res.redirect('/auth/login');
  }
};
