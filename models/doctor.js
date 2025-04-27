'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Doctor extends Model {
    static associate(models) {
      // Define a one-to-many relationship: A doctor has many clients
      Doctor.hasMany(models.Client, {
        foreignKey: "DoctorId",
        as: "clients"
      });

      // **FIX: Define relationship with Programs**
      Doctor.hasMany(models.Program, {
        foreignKey: "DoctorId",
        as: "Programs"
      });
    }
  }

  Doctor.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    speciality: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Doctor',
  });

  return Doctor;
};