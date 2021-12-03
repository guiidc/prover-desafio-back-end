const request = require('supertest');
const { User } = require('../src/models');
const app = require('../index.js');
const bcrypt = require('bcryptjs');

const passwordToTest = bcrypt.hashSync('123456');

describe('Rota POST / Login', () => {

  beforeEach( async () => {
    await User.destroy({ where: {}})
    await User.create({ nome:'Test User', password: passwordToTest, email:'teste@teste.com'});
  });
  afterEach( async () => {
    await User.destroy({truncate: true, cascade: true})
  });

  it('Deve retornar status 400 ao enviar login inexistente ou errado', async () => {
    const response = await request(app).post('/login')
    .send({
      email: 'user@naocadastrado.com',
      password:'123456',
    });
    expect(response.status).toBe(400);
    expect(response.body.message).toBe('E-mail ou senha inválidos')
  });
  it('Deve retornar status 400 ao enviar senha errada', async () => {
    const response = await request(app).post('/login')
    .send({
      email: 'teste@teste.com',
      password:'12345',
    });
    expect(response.status).toBe(400);
    expect(response.body.message).toBe('E-mail ou senha inválidos')
  });
})
