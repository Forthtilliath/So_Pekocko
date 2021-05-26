const express = require('express');
const path = require('path');
const config = require('./config/params');
const app = express();
require('./config/database');

const headers = require('./config/header');
const sauceRoutes = require('./routes/sauce');
const userRoutes = require('./routes/user');

// Middlewares
app.use(headers);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/images', express.static(path.join(__dirname, 'images')));

// Routes
app.use('/api/sauces', sauceRoutes);
app.use('/api/auth', userRoutes);

module.exports = app;
