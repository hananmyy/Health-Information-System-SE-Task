'use strict';

const { Doctor } = require('../models');

module.exports = {
  async up(queryInterface, Sequelize) {
    await Doctor.bulkCreate([
      {
        name: "Faith Karanja",
        email: "faith@gmail.com",
        password: "hello123",
        speciality: "Cardiology",
      },
      {
        name: "Amina Farah",
        email: "aminaF@gmail.com",
        password: "hello123",
        speciality: "Nephrology",
      },
      {
        name: "Emily Kimani",
        email: "emily@gmail.com",
        password: "hello123",
        contact: "General Medicine",
      }
    ], { timestamps: true }); // Ensures timestamps are automatically handled
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Doctors', null, {});
  }
};