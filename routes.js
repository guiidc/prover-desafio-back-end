const routes = require('express').Router();

const userController = require('./src/controllers/userController');
const loginController = require('./src/controllers/loginController');
const employeeController = require('./src/controllers/employeeController');
const positionController = require('./src/controllers/positionController');
const passwordController = require('./src/controllers/passwordController');

const validateToken = require('./src/middlewares/validateToken');

routes.post('/register', userController.createUser);
routes.post('/login', loginController.login);
routes.post('/add-employee', validateToken, employeeController.addEmployee);
routes.get('/positions', validateToken, positionController.getPositions);
routes.get('/employees', validateToken, employeeController.getEmployees);
routes.post('/recover-password', passwordController.recover);
routes.post('/reset-password', passwordController.reset);

module.exports = routes;
