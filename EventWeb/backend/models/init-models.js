const { DataTypes } = require("sequelize");

const UtilisateurModel = require("./utilisateur");
const OrganisateurModel = require("./organisateur");
const PrestataireModel = require("./prestataire")

const sequelize = require("../config/sequelize");

const utilisateurs = UtilisateurModel(sequelize, DataTypes);
const organisateur = OrganisateurModel(sequelize, DataTypes);
const prestataire = PrestataireModel(sequelize, DataTypes);

const db = {
  utilisateurs,
  organisateur,
  prestataire,
};

Object.keys(db).forEach((modelName) => {
    if (db[modelName].associate) {
      db[modelName].associate(db);
    }
  });
  
module.exports = db;