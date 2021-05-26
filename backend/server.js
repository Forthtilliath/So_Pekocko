const server = require('./controllers/server');
const app = require('./app');

server.create('http', 3000, app);
server.create('https', 3030, app);
