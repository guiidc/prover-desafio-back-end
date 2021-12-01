const loginService = require('../services/loginService');

async function login(req, res) {
  const { email, password } = req.body;
  const login = await loginService.login(email, password);
  if (login.error) return res.status(login.code).json({ message: login.error });
  res.status(200).json(login);
}

module.exports = {
  login,
}