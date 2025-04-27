module.exports = {
  up: async (queryInterface, Sequelize) => {
    // **Step 1: Add the column without constraints**
    await queryInterface.addColumn("programs", "DoctorId", {
      type: Sequelize.INTEGER,
      allowNull: true, // Temporarily allow NULL to fix existing rows
    });

    // **Step 2: Assign a default DoctorId to existing rows**
    await queryInterface.sequelize.query(`
      UPDATE programs SET DoctorId = (SELECT id FROM doctors LIMIT 1) WHERE DoctorId IS NULL;
    `);

    // **Step 3: Add foreign key constraint after fixing existing rows**
    await queryInterface.changeColumn("programs", "DoctorId", {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "doctors",
        key: "id",
      },
      onDelete: "CASCADE",
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("programs", "DoctorId");
  }
};