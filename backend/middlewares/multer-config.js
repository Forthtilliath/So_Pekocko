const multer = require('multer');
const storage = require('../config/upload');
// const MulterSharpResizer = require('multer-sharp-resizer');


module.exports = multer(storage).single('image');
