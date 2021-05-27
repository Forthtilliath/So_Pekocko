const Sauce = require('../models/Sauce');
const File = require('../classes/File');

exports.getAllSauces = (req, res, next) => {
    Sauce.find()
        .then((sauces) => res.status(200).json(sauces))
        .catch((error) => res.status(400).json(error));
};

exports.getOneSauce = (req, res, next) => {
    Sauce.findById(req.params.id)
        .then((sauce) => res.status(200).json(sauce))
        .catch((error) => res.status(404).json(error));
};

exports.createSauce = (req, res, next) => {
    const { _id, ...sauceObject } = JSON.parse(req.body.sauce);
    const sauce = new Sauce({
        ...sauceObject,
        imageUrl: File.getUrl(req),
        likes: 0,
        dislikes: 0,
        usersLiked: [],
        usersDisliked: [],
    });
    sauce
        .save()
        .then(() => {
            res.status(201).json({ message: 'La sauce a bien été ajoutée !' });
        })
        .catch((error) => res.status(400).json(error));
};

exports.editSauce = (req, res, next) => {
    Sauce.findById(req.params.id)
        .then((sauce) => {
            if (sauce.userId !== req.body.userId) {
                res.status(401).json({ error: 'Authorisation refusée' });
                return;
            }
            let sauceObject = {};
            if (req.file) {
                File.remove(req.params.id);
                sauceObject = {
                    ...JSON.parse(req.body.sauce),
                    imageUrl: File.getUrl(req),
                };
            } else {
                sauceObject = { ...req.body };
            }
            Sauce.updateOne({ _id: req.params.id }, { _id: req.params.id, ...sauceObject })
                .then((sauces) => res.status(200).json({ message: 'La sauce a bien été mise à jour !' }))
                .catch((error) => res.status(404).json(error));
        })
        .catch((error) => res.status(404).json(error));
};

exports.deleteSauce = (req, res, next) => {
    Sauce.findById(req.params.id)
        .then(() => {
            File.remove(req.params.id);
            Sauce.deleteOne({ _id: req.params.id })
                .then(() => {
                    res.status(200).json({ message: 'La sauce a bien été supprimée !' });
                })
                .catch((error) => res.status(404).json(error));
        })
        .catch((error) => res.status(404).json(error));
};

exports.likeSauce = (req, res, next) => {
    Sauce.findById(req.params.id)
        .then((sauce) => {
            let newValues = {};
            let message = '';

            if (req.body.like === 1) {
                if (sauce.usersLiked.includes(req.body.userId)) {
                    throw "Erreur, l'utilisateur aime déjà la sauce";
                }
                if (sauce.usersDisliked.includes(req.body.userId)) {
                    throw "Erreur, l'utilisateur déteste déjà la sauce";
                }
                newValues = {
                    $push: { usersLiked: req.body.userId },
                    $inc: { likes: 1 },
                };
                message = "L'utilisateur aime la sauce";
            } else if (req.body.like === -1) {
                if (sauce.usersLiked.includes(req.body.userId)) {
                    throw "Erreur, l'utilisateur aime déjà la sauce";
                }
                if (sauce.usersDisliked.includes(req.body.userId)) {
                    throw "Erreur, l'utilisateur déteste déjà la sauce";
                }
                newValues = {
                    $push: { usersDisliked: req.body.userId },
                    $inc: { dislikes: 1 },
                };
                message = "L'utilisateur déteste la sauce";
            } else {
                if (sauce.usersLiked.includes(req.body.userId)) {
                    newValues = {
                        $pull: { usersLiked: req.body.userId },
                        $inc: { likes: -1 },
                    };
                    message = "L'utilisateur n'aime plus la sauce";
                }
                if (sauce.usersDisliked.includes(req.body.userId)) {
                    newValues = {
                        $pull: { usersDisliked: req.body.userId },
                        $inc: { dislikes: -1 },
                    };
                    message = "L'utilisateur ne déteste plus la sauce";
                }
            }
            console.log(message);
            Sauce.updateOne({ _id: req.params.id }, newValues)
                .then(() => res.status(200).json(message))
                .catch((error) => res.status(404).json(error));
        })
        .catch((error) => res.status(404).json(error));
};
