# Desafio PROVER Back-End

## Sobre o projeto
Este projeto é um desafio da empresa PROVER que consiste em uma lista de cadastro de funcionários com CRUD básico, sistema de login e recuperação de senha.

A API foi construida seguindo o padrão Restful com MSC, que serve as informações para um front-end feito em React.

## Tecnologias utilizadas
### Back-End
- NodeJs
- Express
- BcryptJs
- Validator 
- MySQL
- Sequelize
- JSON Web Token
- NoideMailer
- Jest
- Supertest
- DotEnv
- Helmet

### Front-End
- ReactJS
- React Router Dom
- Axios


### Instruções Back-End
1. Após clonar o repositório rode o comando `npm install` para instalar as dependências necessárias.
2. Crie uma arquivo .env para setar as variaveis de ambiente a seguir
+ DB_USERNAME= usuário do banco de dados
+ DB_PASSWORD= senha do banco de dados
+ DB_HOST= endereço do banco de dados
* JWT_SECRET= string secreta para gerar os tokens JEWT
* EMAIL_USER=usuário do e-mail que irá enviar o link de recuperação
* EMAIL_PASSWORD com a senha do email que irá enviar o link de recuperação
5. instale o sequelize-cli com o comando `npm install sequelize-cli -D`
6. Após a instalação do sequelize rode os seguintes comandos para criar as tabelas e o DB necessário 
```
npx sequelize-cli db:create
npx sequelize-cli db:migrate
npx sequelize-cli db:seed:all
```

4. A aplicação roda na porta 3001, certifique-se de que a porta em questão não está sendo utilizada no momento por outra aplicação. Para iniciar o servidor basta digitar o o comando `$ npm run dev` no terminal

5. Para rodar os teste, antes de exuctar o comando `npm test` é preciso criar o banco de testes, fazer as suas migrations também, para isso execute o comando 
```
NODE_ENV=test npx sequelize db:create
NODE_ENV=test npx sequelize db:migrate
NODE_ENV=test npx sequelize db:seed:all
```

### Instruções Front-End
1. Após clonar o repositório execute o comando `npm install` para instalar as dependências necessárias.
2. Execute o comando npm start para iniciar a aplicação
3. Obs.: A aplicação front roda na porta 3000 e faz a requisção para o back-end que está na porta 3001. Ao executar verifique se alguma dessas portas não estão sendo usadadas por outros serviços.
