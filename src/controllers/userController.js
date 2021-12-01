const userService = require('../services/userServices');

async function createUser(req, res) {
  const { name, email, password } = req.body;
  const user = await userService.createUser(name, email, password);
  if (user.error) return res.status(user.code).json({ message: user.error });
  res.status(200).json(user);
}

module.exports = {
  createUser,
};
