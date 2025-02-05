'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Organisateur extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Organisateur.init({
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Organisateur',
  });
  return Organisateur;
};