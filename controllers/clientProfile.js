const { Client, Doctor, Program } = require('../models');

module.exports = async (req, res) => {
  try {
    // Fetch the client data by ID, including associated doctor and program information
    const client = await Client.findByPk(req.params.id, {
      include: [
        { model: Doctor, as: "doctor", attributes: ["name", "email", "speciality"] },
        { model: Program, as: "Programs" }
      ]
    });

    if (!client) {
      // If no client is found, handle the error gracefully for both HTML and API requests
      if (req.headers['accept'] && req.headers['accept'].includes('application/json')) {
        return res.status(404).json({ message: 'Client not found' });
      }
      req.flash('error', 'Client not found.');
      return res.redirect('/clients'); // Redirect to the client list page if not found
    }

    // If the request is for JSON (API request)
    if (req.headers['accept'] && req.headers['accept'].includes('application/json')) {
      // Return client data in JSON format
      return res.json({
        id: client.id,
        name: client.name,
        dob: client.dob,
        email: client.email,
        gender: client.gender,
        contact: client.contact,
        doctor: client.doctor ? {
          name: client.doctor.name,
          email: client.doctor.email,
          speciality: client.doctor.speciality
        } : null,
        programs: client.Programs.map(program => program.name) // Programs client is enrolled in
      });
    }

    // If not an API request, render the client profile page
    const programs = await Program.findAll();

    // Render the client profile page with client and program data
    res.render('clientProfile', {
      client,
      programs,
    });

  } catch (error) {
    console.error('Error fetching client details:', error);
    // Handle errors for both HTML and API requests
    if (req.headers['accept'] && req.headers['accept'].includes('application/json')) {
      return res.status(500).json({ message: 'Something went wrong' });
    }
    req.flash('error', 'Something went wrong.');
    res.redirect('/clients');  // Redirect to the client list page on error
  }
};
