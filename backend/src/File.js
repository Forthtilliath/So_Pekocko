const Sauce = require('../models/Sauce');
const fs = require('fs');

module.exports = class File {
    static MIME_TYPES = {
        'image/jpg': 'jpg',
        'image/jpeg': 'jpg',
        'image/png': 'png',
    };

    static path = 'images';

    constructor() {
        //
    }

    /**
     * Rename an image file with timestamp
     * @param {String} originalname
     * @returns New name of image file
     */
    static rename(originalname, mimetype) {
        const name = originalname.replaceAll(' ', '_').substring(0, originalname.lastIndexOf('.'));
        const extension = this.MIME_TYPES[mimetype];
        return name + '_' + Date.now() + '.' + extension;
    }

    static getUrl(req) {
        return `${req.protocol}://${req.get('host')}/${this.path}/${req.file.filename}`;
    }

    static remove(id) {
        Sauce.findById(id).then((sauce) => {
            const filename = sauce.imageUrl.split(`/${this.path}/`)[1];
            fs.unlinkSync(`${this.path}/${filename}`, (err) => {
                if (err) throw 'Image non trouvée !';
                console.log('File deleted!');
            });
        });
    }
};
