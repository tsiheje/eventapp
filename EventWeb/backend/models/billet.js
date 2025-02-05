'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Billet extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Billet.init({
    type: DataTypes.STRING,
    dateAchat: DataTypes.DATE,
    type: DataTypes.STRING,
    prix: DataTypes.FLOAT,
    participantId: DataTypes.INTEGER,
    organisateurId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Billet',
  });
  return Billet;
};