const passwordValidator = require('password-validator');

// Create a schema
const passwordSchema = new passwordValidator();
// prettier-ignore
passwordSchema
    .is().min(8)          // Minimum length 8
    .has().uppercase()    // Must have uppercase letters
    .has().lowercase()    // Must have lowercase letters
    .has().symbols()      // Must have at least 1 symbol
    .has().digits(2)      // Must have at least 2 digits
    .has().not().spaces() // Should not have spaces

module.exports = passwordSchema;
