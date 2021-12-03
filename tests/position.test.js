const request = require('supertest');
const { User, Position } = require('../src/models');
const app = require('../index.js');
const jwt = require('jsonwebtoken');
require('dotenv').config();

describe('Rota POST / Employees', () => {
  let token;
  beforeAll( async () => {
    await User.destroy({ where: {}})
    const user = await User.create({ nome: 'tokeModel', password: '123456', email:'teste@teste.com'});
    await Position.create({ position: 'Corretor' });
    token = jwt.sign(user.id, process.env.JWT_SECRET);
  })

  it('Deve retornar a uma lista com todos os cargos cadastrados na tabela', async () => {
    const response = await request(app).get('/positions')
    expect(response.body.message).toBe("Token not found")
    expect(response.status).toBe(401)
  });
  it('Deve retornar a uma lista com todos os cargos cadastrados na tabela', async () => {
    const response = await request(app).get('/positions')
    .set({ authorization: token});
    expect(response.status).toBe(200)
  });
});