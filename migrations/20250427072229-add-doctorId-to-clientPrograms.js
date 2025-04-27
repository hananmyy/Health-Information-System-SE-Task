module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("ClientPrograms", "DoctorId", {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: { model: "Doctors", key: "id" },
      onDelete: "CASCADE",
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("ClientPrograms", "DoctorId");
  }
};