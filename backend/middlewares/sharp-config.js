const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

module.exports = async (req, res, next) => {
    if (req.file) {
        const { filename: image } = req.file;

        await sharp(req.file.path)
            .resize(500)
            .jpeg({ quality: 50 })
            .toFile(path.resolve(req.file.destination, '', 'r_' + image));
        fs.unlinkSync(req.file.path);
    }

    next();
};
