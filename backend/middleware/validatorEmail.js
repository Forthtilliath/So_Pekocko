const emailValidator = require('email-validator');

module.exports = (req, res, next) => {
    if (!emailValidator.validate(req.body.email)) {
        res.writeHead(400, "Merci de saisir un format d'email correct.").end();
    } else {
        next();
    }
};
