const { argon2id, argon2Verify } = require('hash-wasm');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const crypto = require('crypto');

exports.signup = (req, res, next) => {
    const salt = crypto.randomBytes(32);
    argon2id({
        password: req.body.password,
        salt,
        parallelism: 1, // p
        iterations: 8, // t
        memorySize: 1024 * 35, // m / in Kb
        hashLength: 32, // output size = 32 bytes
        outputType: 'encoded', // return standard encoded string containing parameters needed to verify the key
    })
        .then((hash) => {
            const user = new User({
                email: req.body.email,
                password: hash,
            });
            user.save()
                .then(() => res.status(201).json({ message: 'Utilisateur ajouté !' }))
                .catch((error) => { console.log(error); res.status(400).json({ error }) });
        })
        .catch((error) => {
            console.log(error);
            res.status(500).json({ error });
        });
};

/**
 * TODO Ajouter un système de limite de tentatives avant de se connecter
 * [ ] Ajouter un champ : NbTentatives
 *  [ ] Incrémenter de 1 à chaque echec
 *  [ ] Réinitialiser à 0 à chaque réussite
 * [ ] Ajouter un champ : LastTentative
 *  [ ] Mettre à jour le timetamp à chaque echec
 */
/** */
exports.login = (req, res, next) => {
    User.findOne({ email: req.body.email })
        .then((user) => {
            if (!user) return res.status(401).json({ error: 'Utilisateur non trouvé !' });
            argon2Verify({
                password: req.body.password,
                hash: user.password,
            })
                .then((valid) => {
                    if (!valid) {
                        return res.status(401).json({ error: 'Mot de passe incorrect !' });
                    }
                    console.log(`L'utilisateur ${req.body.email} est maintenant connecté !`);
                    res.status(200).json({
                        userId: user._id,
                        token: jwt.sign({ userId: user._id }, process.env.TOKEN, {
                            expiresIn: '1h',
                        }),
                    });
                })
                .catch((error) => res.status(500).json(error));
        })
        .catch((error) => res.status(500).json(error));
};
