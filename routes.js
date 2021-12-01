const routes = require('express').Router();

const userController = require('./src/controllers/userController');

routes.post('/register', userController.createUser);

module.exports = routes;
