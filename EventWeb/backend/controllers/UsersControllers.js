const { Op } = require("sequelize");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../models/init-models");

const UserController = {
    register: async function (req, res) {
        try {
            const {nom, email, telephone, motDePasse, type, specialite, tarifhoraire, disponipibilite,  profil} = req.body;

            if (!nom || !email || !telephone || !motDePasse || !type) {
                return res.status(400).json({
                    error: "Tous les champs sont obligatoires"
                });
            }

            if (!['Prestataire', 'Organisateur'].includes(type)) {
                return res.status(400).json({
                    error: "Type d'utilisateur invalide"
                });
            }

            const existingUser = await db.utilisateurs.findOne({
                where: { email }
            });

            if (existingUser) {
                return res.status(400).json({
                    error: "Cet email est déjà utilisé"
                });
            }

            const hashedPassword = await bcrypt.hash(motDePasse, 10);

            const user = await db.utilisateurs.create({
                nom,
                email,
                telephone,
                motDePasse: hashedPassword,
                type
            });

            switch (type) {
                case 'Prestataire':
                    if (!specialite || !tarifhoraire || !disponipibilite || !profil) {
                        await user.destroy();
                        return res.status(400).json({
                            error: "Les informations du prestataire sont incomplètes"
                        });
                    }

                    await db.prestataire.create({
                        userId: user.id,
                        specialite,
                        tarifhoraire,
                        disponipibilite,
                        profil
                    });
                    break;

                case 'Organisateur':
                    await db.organisateur.create({
                        userId: user.id
                    });
                    break;
            }

            const token = jwt.sign(
                { 
                    userId: user.id, 
                    type: user.type 
                },
                process.env.JWT_SECRET,
                { expiresIn: '1h' }
            );

            const userResponse = {
                id: user.id,
                nom: user.nom,
                email: user.email,
                telephone: user.telephone,
                type: user.type,
                token
            };

            if (type === 'Prestataire') {
                const prestataire = await db.prestataire.findOne({
                    where: { userId: user.id }
                });
                userResponse.prestataire = prestataire;
            } else if (type === 'Organisateur') {
                const organisateur = await db.organisateur.findOne({
                    where: { userId: user.id }
                });
                userResponse.organisateur = organisateur;
            }

            res.status(201).json(userResponse);

        } catch (error) {
            console.error("Erreur lors de l'inscription:", error);
            res.status(500).json({
                error: "Une erreur est survenue lors de l'inscription"
            });
        }
    },
    login: async function (req, res) {
        try {
            const { email, motDePasse } = req.body;
            console.log(email);
            if (!email || !motDePasse) {
                return res.status(400).json({
                    error: "Tous les champs sont obligatoires"
                });
            }

            const user = await db.utilisateurs.findOne({
                where: { email }
            });

            if (!user) {
                return res.status(400).json({
                    error: "Email ou mot de passe incorrect"
                });
            }

            const isPasswordValid = await bcrypt.compare(motDePasse, user.motDePasse);

            if (!isPasswordValid) {
                return res.status(400).json({
                    error: "Email ou mot de passe incorrect"
                });
            }

            const token = jwt.sign(
                { 
                    userId: user.id, 
                    type: user.type 
                },
                process.env.JWT_SECRET,
                { expiresIn: '1h' }
            );

            const userResponse = {
                id: user.id,
                nom: user.nom,
                email: user.email,
                telephone: user.telephone,
                type: user.type,
                token
            };

            if (user.type === 'Prestataire') {
                const prestataire = await db.prestataire.findOne({
                    where: { userId: user.id }
                });
                userResponse.prestataire = prestataire;
            } else if (user.type === 'Organisateur') {
                const organisateur = await db.organisateur.findOne({
                    where: { userId: user.id }
                });
                userResponse.organisateur = organisateur;
            }

            res.json(userResponse);

        } catch (error) {
            console.error("Erreur lors de la connexion:", error);
            res.status(500).json({
                error: "Une erreur est survenue lors de la connexion"
            });
        }
    }
    
};

module.exports = UserController;