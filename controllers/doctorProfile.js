const { Doctor } = require('../models');

module.exports = async (req, res) => {
  if (!req.session.doctorId) {
    return res.redirect('/auth/login');
  }

  try {
    const doctor = await Doctor.findByPk(req.session.doctorId);

    if (!doctor) {
      req.flash('error', 'Doctor not found.');
      return res.redirect('/auth/login');
    }

    res.render('doctorProfile', { doctor });

  } catch (error) {
    console.error('Error fetching doctor details:', error);
    req.flash('error', 'Something went wrong.');
    res.redirect('/auth/login');
  }
};
