'use strict';
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Program extends Model {
    static associate(models) {
      // Associate program with a doctor (the creator)
      Program.belongsTo(models.Doctor, {
        foreignKey: "DoctorId",
        as: "doctor"
      });

      // Many-to-Many relationship with Clients
      Program.belongsToMany(models.Client, {
        through: "ClientPrograms",
        foreignKey: "ProgramId",
        as: "Clients"
      });
    }
  }

  Program.init({
    name: { type: DataTypes.STRING, allowNull: false, unique: true },
    description: { type: DataTypes.TEXT, allowNull: true },
    DoctorId: { type: DataTypes.INTEGER, allowNull: false } // Track the doctor who created the program
  }, {
    sequelize,
    modelName: "Program",
  });

  return Program;
};