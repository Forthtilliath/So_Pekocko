const express = require('express');
const path    = require('path');
const helmet  = require('helmet');
const db      = require('./config/database');
const app     = express();
app.set('trust proxy', 1) // trust first proxy

const router  = express.Router();
db.connectUser();

const sauceRoutes = require('./routes/sauce');
const userRoutes = require('./routes/user');

const headers = require('./config/header');
const apiLimiter = require('./middleware/apiLimiter');

// Middlewares
// app.use(apiLimiter);
app.use(helmet());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/images', express.static(path.join(__dirname, 'images')));

// Routes
router.use('/sauces', sauceRoutes);
router.use('/auth', userRoutes);

app.use('/api', headers, router);

module.exports = app;
