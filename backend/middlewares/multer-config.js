const multer = require('multer');
const File = require('../src/File');

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'images');
    },
    filename: (req, file, callback) => {
        callback(null, File.rename(file.originalname, file.mimetype));
    },
});

module.exports = multer({ storage: storage }).single('image');
