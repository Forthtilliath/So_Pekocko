const express = require('express');
const path = require('path');
const app = express();
const helmet = require('helmet');
require('./config/database');

const sauceRoutes = require('./routes/sauce');
const userRoutes = require('./routes/user');

const apiLimiter = require('./middleware/apiLimiter');

// Middlewares
app.use(require('./config/header'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(helmet());
app.use('/images', express.static(path.join(__dirname, 'images')));

// Routes
app.use('/api/sauces', apiLimiter, sauceRoutes);
app.use('/api/auth', apiLimiter, userRoutes);

module.exports = app;
