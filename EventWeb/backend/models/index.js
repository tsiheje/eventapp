'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasOne(models.Participant);
      User.hasOne(models.Organisateur);
      User.hasOne(models.Prestataire);
    }
  }

  class Participant extends Model {
    static associate(models) {
      Participant.belongsTo(models.User);
      Participant.hasMany(models.Billet);
      Participant.hasMany(models.Evaluation);
    }
  }

  class Organisateur extends Model {
    static associate(models) {
      Organisateur.belongsTo(models.User);
      Organisateur.hasMany(models.Evenement);
    }
  }

  class Prestataire extends Model {
    static associate(models) {
      Prestataire.belongsTo(models.User);
      Prestataire.hasMany(models.Service);
      Prestataire.hasMany(models.Evaluation);
    }
  }

  class Evenement extends Model {
    static associate(models) {
      Evenement.belongsTo(models.Organisateur);
      Evenement.hasMany(models.Billet);
    }
  }

  class Billet extends Model {
    static associate(models) {
      Billet.belongsTo(models.Participant);
      Billet.belongsTo(models.Evenement);
    }
  }

  class Evaluation extends Model {
    static associate(models) {
      Evaluation.belongsTo(models.Prestataire);
      Evaluation.belongsTo(models.Participant);
    }
  }

  class Service extends Model {
    static associate(models) {
      Service.belongsTo(models.Prestataire);
    }
  }

  return {
    User,
    Participant, 
    Organisateur,
    Prestataire,
    Evenement,
    Billet,
    Evaluation,
    Service
  };
};