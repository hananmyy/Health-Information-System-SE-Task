'use strict';

const { Client } = require('../models');

module.exports = {
  async up(queryInterface, Sequelize) {
    await Client.bulkCreate([
      {
        name: "Anthony Karanja",
        dob: "1995-06-15",
        email: "anthony@gmail.com",
        gender: "Male",
        contact: "0776543210",
        DoctorId: 1
      },
      {
        name: "Alana Mohamed",
        dob: "1988-10-22",
        email: "alana@gmail.com",
        gender: "Female",
        contact: "0734567890",
        DoctorId: 1 // Added missing comma here
      },
      {
        name: "Emily Kimani",
        dob: "2000-03-09",
        email: "emily@gmail.com",
        gender: "Female",
        contact: "0771234560",
        DoctorId: 1
      }
    ], { timestamps: true }); // Ensures timestamps are automatically handled
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Clients', null, {});
  }
};