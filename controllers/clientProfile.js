const { Client, Doctor, Program } = require('../models'); // Include Program model

module.exports = async (req, res) => {
  try {
    const client = await Client.findByPk(req.params.id, {
      include: [
        { model: Doctor, as: "doctor", attributes: ["name", "email", "speciality"] },
        { model: Program } // Also include enrolled programs
      ]
    });

    if (!client) {
      req.flash('error', 'Client not found.');
      return res.render('clientProfile', { error: 'Client not found.', client: null, programs: [] });
    }

    const programs = await Program.findAll(); // Fetch all available programs

    res.render('clientProfile', {
      client,
      programs,
      successMessage: req.flash('successMessage'),
      error: req.flash('error')
    });

  } catch (error) {
    console.error('Error fetching client details:', error);
    req.flash('error', 'Something went wrong.');
    res.render('clientProfile', { error: 'Something went wrong.', client: null, programs: [] });
  }
};
