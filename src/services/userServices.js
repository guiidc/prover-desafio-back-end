const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../models');

let errors = [];

function validateName(name) {
  if (!name) return errors.push({ code: 400, error: 'O campo "nome" é obrigatório' });
  if (name.length < 3) errors.push({ code: 400, error: 'O nome deve conter no mínimo 3 caracteres' });
}

async function validateEmail(email) {
  if (!email) return errors.push({ code: 400, error: 'O campo e-mail é obrigatório' });
  if (!validator.isEmail(email)) errors.push({ code: 400, error: 'E-mail inválido' });
  const alreadyExists = await User.findOne({ where: { email } });
  if (alreadyExists) errors.push({ code: 401, error: 'E-mail já cadastrado' })
}

function validatePassword(password) {
  if (!password) return errors.push({ code: 400, error: 'O campo "senha" é obrigatório' });
  if (password.length < 6) errors.push({ code: 400, error: 'Sua senha deve conter no mínimo 6 caracteres' });
}

async function validateData(name, email, password) {
  errors = [];
  validateName(name);
  await validateEmail(email);
  validatePassword(password);
}

async function createUser(name, email, password) {
  await validateData(name, email, password);
  if (errors.length) {
    const [error] = errors;
    return error;
  }
  const salt = bcrypt.genSaltSync();
  const passwordHash = bcrypt.hashSync(password, salt);
  const user = await User.create({ nome: name, email, password: passwordHash });
  const token = jwt.sign({ payload: { id: user.id } }, process.env.JWT_SECRET);
  return { token };
}

module.exports = {
  createUser,
}