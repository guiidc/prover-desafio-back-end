const nodemailer = require('nodemailer');
require('dotenv').config();
const { User } = require('../models');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  port: 587,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  }
});

async function recover(req, res) {
  const message = 'Algo deu errado';
  const { email } = req.body;
  if (!email) return res.status(400).json({ message });

  const user = await User.findOne({ where: { email }});
  if (!user) return res.status(404).json({ message: 'Algo deu errado'});

  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '15m'});

  transporter.sendMail({
    from: 'EmployeeBook <guilhermedc93@gmail.com>',
    to: `${email}`,
    sibject: 'Recuperação de Senha',
    html: `Olá clique no link a seguir para recuperar a sua senha <br> <a href=http://localhost:3000/reset-pwd/${user.id}/${email}/${token}>recuperar senha<a>`
  });
  res.status(200).json({ message: 'email enviado'});
}

async function reset(req, res) {
  const { id, email, token, password } = req.body;

  let payload;
  try {
    payload = jwt.verify(token, process.env.JWT_SECRET);
  } catch {
    return res.status(403).json({ message: 'Token inválido ou expirado'})
  }
  
  const user = await User.findOne({ where: { id: payload.id }});
  if (email !== user.email) return res.status(403).json({ message: 'Token inválido ou expirado'});
  const salt = bcrypt.genSaltSync();
  const hashPassword = bcrypt.hashSync(password, salt);
  const newToken = jwt.sign({payload: { id }}, process.env.JWT_SECRET)
  await User.update({ password: hashPassword }, { where: { id }})
  res.status(200).json({ token: newToken});
}

module.exports = {
  recover,
  reset,
}