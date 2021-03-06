const chalk = require('chalk');

const errorHandler = (error, port) => {
    if (error.syscall !== 'listen') {
        throw error;
    }
    switch (error.code) {
        case 'EACCES':
            console.error(chalk.red('Erreur :', port, 'requires elevated privileges.'));
            process.exit(1);
        case 'EADDRINUSE':
            console.error(chalk.red('Erreur :', port, 'is already in use.'));
            process.exit(1);
        default:
            throw error;
    }
};

const successHandler = (port, color) => {
    console.log(color('Listening on ' + port));
};

module.exports = { errorHandler, successHandler };
