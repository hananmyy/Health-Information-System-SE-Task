'use strict';

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('Programs', [
      { name: "Tuberculosis", description: "TB treatment and prevention programs.", createdAt: new Date(), updatedAt: new Date() },
      { name: "Malaria", description: "Malaria prevention and treatment initiatives.", createdAt: new Date(), updatedAt: new Date() }
    ]);
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('Programs', { name: ["Tuberculosis", "Malaria"] });
  }
};