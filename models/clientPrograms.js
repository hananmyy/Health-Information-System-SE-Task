'use strict';
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class ClientPrograms extends Model {
    static associate(models) {
      ClientPrograms.belongsTo(models.Client, { foreignKey: "ClientId" });
      ClientPrograms.belongsTo(models.Program, { foreignKey: "ProgramId" });
      ClientPrograms.belongsTo(models.Doctor, { foreignKey: "DoctorId" }); // ✅ Tracks doctor who enrolled client
    }
  }

  // ✅ Ensure `ClientPrograms` is initialized
  ClientPrograms.init(
    {
      ClientId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: "Clients", key: "id" },
        onDelete: "CASCADE",
      },
      ProgramId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: "Programs", key: "id" },
        onDelete: "CASCADE",
      },
      DoctorId: { // ✅ Added DoctorId
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: "Doctors", key: "id" },
        onDelete: "CASCADE",
      },
    },
    {
      sequelize,
      modelName: "ClientPrograms",
    }
  );

  return ClientPrograms;
};