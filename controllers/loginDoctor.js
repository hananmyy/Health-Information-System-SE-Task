const bcrypt = require('bcrypt');
// const { Doctor } = require('../models');

module.exports = async (req, res) => {
  const { email, password } = req.body;

  console.log('Login attempt:', { email });

  if (!email || !password) {
    req.flash('error', 'Please fill in all fields.');
    return res.redirect('/auth/login');
  }

  try {
    const doctor = await Doctor.findOne({ where: { email } });
    if (doctor && await bcrypt.compare(password, doctor.password)) {
      req.session.doctorId = doctor.id;
      req.flash('successMessage', 'Login Successful! Welcome back.');
      return res.redirect('/doctor/dashboard');
    } else {
      req.flash('error', 'Invalid email or password.');
      return res.redirect('/auth/login');
    }
  } catch (err) {
    console.error('Login error:', err);
    req.flash('error', 'Something went wrong. Please try again later.');
    return res.redirect('/auth/login');
  }
};
