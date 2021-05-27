const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

// prettier-ignore
const sauceSchema = mongoose.Schema({
    userId       : { type: String, required: true },
    name         : { type: String, required: true, min: 3, max: 60 },
    manufacturer : { type: String, required: true, min: 3, max: 60 },
    description  : { type: String, required: true, min: 5, max: 255 },
    mainPepper   : { type: String, required: true, min: 3, max: 60 },
    imageUrl     : { type: String, required: true },
    heat         : { type: Number, required: true },
    likes        : { type: Number, required: true },
    dislikes     : { type: Number, required: true },
    usersLiked   : { type: [String], required: true },
    usersDisliked: { type: [String], required: true },
});
sauceSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Sauce', sauceSchema);
