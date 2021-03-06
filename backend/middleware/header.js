module.exports = function headers() {
    return function headers(_req, res, next) {
        res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
        res.setHeader(
            'Access-Control-Allow-Headers',
            'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization',
        );
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
        next();
    };
};