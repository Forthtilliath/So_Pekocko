const rateLimit = require('express-rate-limit');

module.exports = rateLimit({
    windowMs: 5 * 60 * 1000, // 5 minutes
    max: 100,
    message: 'Vous avez dépassé le nombre de requête en 5 minutes !', 
});