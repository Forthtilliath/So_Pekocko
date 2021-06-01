const multer = require('multer');
const storage = require('../config/upload');

module.exports = multer(storage).single('image');
