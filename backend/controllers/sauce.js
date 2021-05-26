const Sauce = require('../models/Sauce');
const File = require('../src/File');

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
    let sauce = {};
    if (req.file) {
        File.remove(req.params.id);
        sauce = {
            ...JSON.parse(req.body.sauce),
            imageUrl: File.getUrl(req),
        };
    } else {
        sauce = { ...req.body };
    }
    Sauce.updateOne({ _id: req.params.id }, { _id: req.params.id, ...sauce })
        .then((sauces) => res.status(200).json({ message: 'La sauce a bien été mise à jour !' }))
        .catch((error) => res.status(404).json(error));
};

exports.deleteSauce = (req, res, next) => {
    Sauce.findById(req.params.id)
        .then(() => {
            File.remove(req.params.id);
            Sauce.deleteOne({ _id: req.params.id })
                .then((sauce) => {
                    res.status(200).json({ message: 'La sauce a bien été supprimée !' });
                })
                .catch((error) => res.status(404).json(error));
        })
        .catch((error) => res.status(404).json(error));
};

exports.likeSauce = (req, res, next) => {
    Sauce.findById(req.params.id)
        .then((sauce) => {
            // console.log('userId', req.body.userId);
            // console.log('like', req.body.like);
            console.log('AVANT --------------------');
            console.log('usersLiked', sauce.usersLiked);
            console.log('usersDisliked', sauce.usersDisliked);
            console.log('likes', sauce.likes);
            console.log('dislikes', sauce.dislikes);

            let newValues = {};

            if (req.body.like === 1) {
                if (sauce.usersLiked.includes(req.body.userId)) {
                    console.log("Erreur, l'utilisateur aime déjà la sauce");
                }
                newValues = {
                    // usersLiked: [req.body.userId, ...sauce.usersLiked],
                    $push: { usersLiked: req.body.userId },
                    // likes: sauce.likes + 1,
                    $inc: { likes: 1 },
                };
            } else if (req.body.like === -1) {
                if (sauce.usersDisliked.includes(req.body.userId)) {
                    console.log("Erreur, l'utilisateur n'aime déjà pas la sauce");
                }
                newValues = {
                    // usersDisliked: [req.body.userId, ...sauce.usersDisliked],
                    $push: { usersDisliked: req.body.userId },
                    // dislikes: sauce.dislikes + 1,
                    $inc: { dislikes: -1 },
                };
            } else {
                // let index = -1;
                // index = sauce.usersLiked.indexOf(req.body.userId);
                // if (index !== -1) {
                if (sauce.usersLiked.includes(req.body.userId)) {
                    newValues = {
                        // usersLiked: sauce.usersLiked.splice(index, 1),
                        $pull: { usersLiked: req.body.userId },
                        // likes: sauce.likes - 1,
                        $inc: { likes: - 1 },
                    };
                    console.log("L'utilisateur n'aime plus la sauce");
                }
                // index = sauce.usersDisliked.indexOf(req.body.userId);
                // if (index !== -1) {
                if (sauce.usersDisliked.includes(req.body.userId)) {
                    newValues = {
                        // usersDisliked: sauce.usersDisliked.splice(index, 1),
                        $pull: { usersDisliked: req.body.userId },
                        // dislikes: sauce.dislikes - 1,
                        $inc: { dislikes: -1 },
                    };
                    console.log("L'utilisateur ne déteste plus la sauce");
                }
            }
            const sauceObject = Object.assign(sauce, newValues);
            console.log('APRES --------------------');
            console.log('usersLiked', newValues.usersLiked);
            console.log('usersDisliked', newValues.usersDisliked);
            console.log('likes', newValues.likes);
            console.log('dislikes', newValues.dislikes);
            // console.log('usersLiked', sauceObject.usersLiked);
            // console.log('usersDisliked', sauceObject.usersDisliked);
            // console.log('likes', sauceObject.likes);
            // console.log('dislikes', sauceObject.dislikes);
            // Sauce.updateOne({ _id: req.params.id }, sauceObject)
            Sauce.updateOne({ _id: req.params.id }, newValues)
                .then((sauces) => res.status(200).json({ message: 'LIKE ! La sauce a bien été mise à jour !' }))
                .catch((error) => res.status(404).json(error));
        })
        .catch((error) => res.status(404).json(error));
};
