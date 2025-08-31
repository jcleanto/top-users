## Descrição

Microserviço TCP de backend com:
- O CRUD de Usuários;
- Um módulo de autenticação utilizando ```@nestjs/passport``` (essa implementação ainda encontra-se em progresso, ou seja, ainda não foi finalizado todo o flow de autenticação e autorização). Atualmente o Usuário autenticado está sendo salvo no ```localStorage```, sendo assim compartilhado com os serviços de Frontend.

## Setup do projeto

```bash
$ npm install
```

## Compilar e rodar o projeto

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Rodar os testes

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Rodar as migrações e seed de dados

```bash
# Migrações
$ npx knex migrate:latest

# Seed de dados
$ npx knex seed:run
```
