'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Evaluation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Evaluation.init({
    note: DataTypes.FLOAT,
    commentaire: DataTypes.STRING,
    dateEvaluation: DataTypes.DATE,
    prestataireId: DataTypes.INTEGER,
    organisateurId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Evaluation',
  });
  return Evaluation;
};