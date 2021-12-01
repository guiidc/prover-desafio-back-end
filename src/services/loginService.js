const validator = require('validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const { User } = require('../models');

let errors = [];
let rescuedUser;

async function validateEmail(email) {
  if (!email || !validator.isEmail(email)) {
    errors.push({ code: 400, error: 'E-mail inválido' });
    return;
  }
  const user = await User.findOne({ where: { email } });
  if (!user) {
    errors.push({ code: 400, error: 'E-mail ou senha inválidos'});
    return;
  }
  rescuedUser = user;
}

function validatePassword(password) {
  if (!rescuedUser || !password) {
    errors.push({ code: 400, error: 'E-mail ou senha inválidos'});
    return;
  }
  if (!bcrypt.compareSync(password, rescuedUser.password)) {
    errors.push({ code: 400, error: 'E-mail ou senha inválidos'});
  }
}

async function validateData(email, password) {
  errors = [];
  await validateEmail(email);
  validatePassword(password);
}

async function login(email, password) {
  await validateData(email, password);
  if (errors.length) {
    const [error] = errors;
    return error;
  }
  const token = jwt.sign({ payload: { id: rescuedUser.id }}, process.env.JWT_SECRET)
  return { token }

}

module.exports = {
  login,
}