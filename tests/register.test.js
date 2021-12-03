const request = require('supertest');
const { User } = require('../src/models');
const app = require('../index.js');

describe('Rota POST / Register', () => {

  beforeEach( async () => {
    await User.destroy({ where: {}})
    await User.create({ nome: 'Test User', password: 123, email:'teste@teste.com'})
  });

  it('Retorna erro 400 quando não é enviado nenhum nome', async () => {
    const response = await request(app).post('/register')
    .send({
      email: 'emaildeteste@gmail.com',
      password: '123456'

    });
    expect(response.body.message).toBe("O campo \"nome\" é obrigatório")
    expect(response.status).toBe(400)
  });
  it('retorna status 400 quando enviado um nome menor que 3 caracteres', async () => {
    const response = await request(app).post('/register')
    .send({
      name: 'Gu',
      email: 'emaildeteste@gmail.com',
      password: '123456'

    });
    expect(response.body.message).toBe('O nome deve conter no mínimo 3 caracteres')
    expect(response.status).toBe(400)
  });
  it('retorna status 400 Quando não é enviado nenhum email', async () => {
    const response = await request(app).post('/register')
    .send({
      name: 'Gui',
      password: '123456'

    });
    expect(response.body.message).toBe("O campo e-mail é obrigatório")
    expect(response.status).toBe(400)
  });
  it('retorna status 400 Quando é enviado um e-mail inválido', async () => {
    const response = await request(app).post('/register')
    .send({
      name: 'Gui',
      email: 'teste',
      password: '123456'
    });
    expect(response.body.message).toBe("E-mail inválido")
    expect(response.status).toBe(400)
  });
  it('retorna status 401 Quando é enviado um e-mail inválido', async () => {
    const response = await request(app).post('/register')
    .send({
      name: 'Gui',
      email: 'teste@teste.com',
      password: '123456'
    });
    expect(response.body.message).toBe("E-mail já cadastrado")
    expect(response.status).toBe(401)
  });
  it('retorna status 400 quando não é enviada a senha', async () => {
    const response = await request(app).post('/register')
    .send({
      name: 'Gui',
      email: 'teste@gmail.com',
    });
    expect(response.body.message).toBe("O campo \"senha\" é obrigatório")
    expect(response.status).toBe(400)
  });
  it('retorna status 400 quando a senha possui menos de 6 caracteres', async () => {
    const response = await request(app).post('/register')
    .send({
      name: 'Gui',
      email: 'teste2@teste.com',
      password: '123'
    });
    expect(response.body.message).toBe("Sua senha deve conter no mínimo 6 caracteres")
    expect(response.status).toBe(400)
  });

  it('Deve retornar um tokenno corpo da reuqisição e o status 201, quando usuário é inserido com sucesso', async () => {
    const response = await request(app).post('/register')
    .send({
      name: 'NovoUser',
      email: 'novouser@novouser.com',
      password: '123456',
    });
    expect(response.body.token).not.toBeUndefined();
    expect(response.status).toBe(201);
  })
})