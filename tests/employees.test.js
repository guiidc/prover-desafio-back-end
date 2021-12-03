const request = require('supertest');
const { User, Position } = require('../src/models');
const app = require('../index.js');
const jwt = require('jsonwebtoken');
require('dotenv').config();

describe('Rota POST / Employees', () => {
  let token;
  let positionId;
  beforeAll( async () => {
    await User.destroy({ where: {}})
    const user = await User.create({ nome: 'tokeModel', password: '123456', email:'teste@teste.com'});
    const position = await Position.create({ position: 'Corretor' });
    positionId = position.id
    token = jwt.sign(user.id, process.env.JWT_SECRET);
  })

  it('Deve retornar status 401 quando não é passado um token ou o token é inválido', async () => {
    const response = await request(app).post('/add-employee')
    .send({
      name: 'Thor',
      tel: '47 1234-5432',
      birthday: '2022-03-29',
      sex: 'M',
      status: true,
      positionId,
    })
    expect(response.body.message).toBe("Token not found")
    expect(response.status).toBe(401)
  });
  it('Retorna erro 400 ao inserir uma data de nasicmento inválida', async () => {
    const response = await request(app).post('/add-employee')
    .send({
      name: 'Thor',
      tel: '47 1234-5432',
      birthday: '2022-03-29',
      sex: 'M',
      status: true,
      positionId,

    })
    .set({ authorization: token});
    expect(response.body.message).toBe("Data inválida")
    expect(response.status).toBe(400)
  });
  it('Deve retornar status 200 quando um funcionário é cadastrado com sucesso', async () => {
    const response = await request(app).post('/add-employee')
    .send({
      name: 'Thor',
      tel: '47 1234-5432',
      birthday: '1993-03-29',
      sex: 'M',
      status: true,
      positionId,

    })
    .set({ authorization: token});
    expect(response.status).toBe(200)
  });
});
