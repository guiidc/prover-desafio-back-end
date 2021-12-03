const express = require('express');
const routes = require('./routes');
const cors = require('cors');
const helmet = require('helmet');
const { Sequelize } = require('./src/models');
require('dotenv').config();
const { addEmployee } = require('./src/services/employeeService');
const config = require('./config/config');

const sequelize = new Sequelize(
  process.env.NODE_ENV === 'test' ? config.test : config.development
);

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(cors());
app.use(routes);

module.exports = app;