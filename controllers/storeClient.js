const { Client } = require('../models');

module.exports = async (req, res) => {
  const { name, dob, email, gender, contact } = req.body;
  let validationErrors = [];

  try {
    if (!name || !dob || !email || !gender || !contact) {
      validationErrors.push("All fields are required");
    }

    const existing = await Client.findOne({ where: { email } });
    if (existing) {
      validationErrors.push("A client with this email already exists");
    }

    if (validationErrors.length > 0) {
      req.flash('validationErrors', validationErrors);
      req.flash('data', req.body);
      return res.redirect('/client/register');
    }

    await Client.create({
      name,
      dob,
      email,
      gender,
      contact,
    });

    req.flash('successMessage', 'Registration successful! Welcome!');
    res.redirect('/auth/login');
  } catch (error) {
    console.error('Error creating client:', error);
    validationErrors.push("Something went wrong. Try again.");
    req.flash('validationErrors', validationErrors);
    req.flash('data', req.body);
    res.redirect('/client/register');
  }
};