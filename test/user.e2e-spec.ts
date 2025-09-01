import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { UserModule } from '../src/user/user.module';
import { UserService } from '../src/user/user.service';
import { INestApplication } from '@nestjs/common';

describe('User (e2e)', () => {
  let app: INestApplication;
  let userService = {
    findAllUsers: () => ['test'],
    findUserById: () => { return { id: 1, nome: 'Novo Usuário de Teste 1', email: 'teste1@email.com' } },
    createUser: () => { return { id: 2, nome: 'Novo Usuário de Teste 2', email: 'teste2@email.com' } },
    updateUser: () => true,
    deleteUser: () => { return { id: 2, nome: 'Novo Usuário de Teste 2', email: 'teste2@email.com' } },
  };

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [UserModule],
    })
      .overrideProvider(UserService)
      .useValue(userService)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it(`/GET users`, () => {
    return request.default(app.getHttpServer())
      .get('/users')
      .expect(200)
      .expect({
        message: 'Todos os usuários logicamente não deletados (isDeleted=false)',
        data: userService.findAllUsers(),
        count: 1
      });
  });

  it('/users/:userId (GET) should return a user by ID', async () => {
    const userId = 1;
    const response = await request.default(app.getHttpServer())
      .get(`/users/${userId}`)
      .expect(200);

    expect(response.body.data).toHaveProperty('id', userId);
  });

  it('/users (POST) should create a user', async () => {
    const newUser = {
      nome: 'Novo Usuário de Teste 2',
      email: 'teste2@email.com',
    };
    const response = await request.default(app.getHttpServer())
      .post('/users/new')
      .send(newUser)
      .expect(201);

    expect(response.body.data.nome).toEqual(newUser.nome);
    expect(response.body.data).toHaveProperty('id');
  });

  /*
  it('/users/:userId/update (PATCH) should update a user', async () => {
    const userId = 1;
    const updateUser = {
      nome: 'Novo Usuário de Teste 22',
      email: 'teste2@email.com',
    };
    const response = await request.default(app.getHttpServer())
      .patch(`/users/${userId}/update`)
      .send(updateUser)
      .expect(200);

    expect(response.body.data.nome).toEqual(updateUser.nome);
  });
  */

  it('/users/:userId (DELETE) should delete a user', async () => {
    const userId = 1;
    const deleteUser = {
      nome: 'Novo Usuário de Teste 1',
      email: 'teste1@email.com',
    };
    const response = await request.default(app.getHttpServer())
      .delete(`/users/${userId}`)
      .expect(200);

    expect(response.body.data.nome).toEqual(deleteUser.nome);
  });

  afterAll(async () => {
    await app.close();
  });
});