import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { responseMock, statusResponseMock, userMock, userServiceMock } from './user.service.mock';

describe('UserController', () => {
  let userController: UserController;

  beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            controllers: [UserController],
            providers: [userServiceMock]
        }).compile();

        userController = moduleFixture.get<UserController>(UserController);
    });

    it('Should be defined', () => {
        expect(userController).toBeDefined();
    });

    it('Should get all users', async () => {
        const result = await userController.getAllUsers(responseMock);
        expect(responseMock.status).toHaveBeenCalledWith(200);
        expect(statusResponseMock.send).toHaveBeenCalledWith(result);
    });

    it('Should get user', async () => {
        const result = await userController.getUserById(userMock.id, responseMock);
        expect(responseMock.status).toHaveBeenCalledWith(200);
        expect(statusResponseMock.send).toHaveBeenCalledWith(result);

    });

    it('Should create user', async () => {
        const newUser = { ...userMock };
        delete newUser.id;
        const result = await userController.createUser(newUser, responseMock);
        expect(responseMock.status).toHaveBeenCalledWith(201);
        expect(statusResponseMock.send).toHaveBeenCalledWith(result);
    });

    it('Should update user', async () => {
        const userData = { ...userMock };
        delete userData.id;
        const result = await userController.updateUser(userMock.id, userData, responseMock);
        expect(responseMock.status).toHaveBeenCalledWith(200);
        expect(statusResponseMock.send).toHaveBeenCalledWith(result);
    });

    it('Should delete user', async () => {
        const result = await userController.deleteUserById(userMock.id, responseMock);
        expect(responseMock.status).toHaveBeenCalledWith(200);
        expect(statusResponseMock.send).toHaveBeenCalledWith(result);
    });
});
