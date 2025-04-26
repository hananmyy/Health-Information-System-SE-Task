'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Client extends Model {
    static associate(models) {
      // Define a belongsTo relationship: A client belongs to one doctor
      Client.belongsTo(models.Doctor, {
        foreignKey: "DoctorId",
        as: "doctor"
      });

      // Define a many-to-many relationship with Programs
      Client.belongsToMany(models.Program, {
        through: "ClientPrograms",
        as: "Programs",
        foreignKey: "ClientId"
      });
    }
  }

  Client.init({
    name: DataTypes.STRING,
    dob: DataTypes.DATE,
    email: DataTypes.STRING,
    gender: DataTypes.STRING,
    contact: DataTypes.STRING,
    DoctorId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Client',
  });

  return Client;
};