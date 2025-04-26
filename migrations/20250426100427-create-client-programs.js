'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('ClientPrograms', {
      ClientId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'Clients', key: 'id' },
        onDelete: 'CASCADE'
      },
      ProgramId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'Programs', key: 'id' },
        onDelete: 'CASCADE'
      },
      createdAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW')
      },
      updatedAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW')
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('ClientPrograms');
  }
};