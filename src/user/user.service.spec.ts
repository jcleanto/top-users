import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { DatabaseModule } from '../db/database.module';
import { StatusEnum, UserModel } from '../db/models/User.model';

describe('UserService', () => {
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [DatabaseModule],
      providers: [UserService],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findUserById', () => {
    it('should return a user if found', async () => {
      const mockUser = { id: 1, nome: 'Usuário de Teste 1', email: 'teste1@email.com' };

      jest.spyOn(UserModel, 'query').mockReturnValue({
        findOne: jest.fn().mockResolvedValue(mockUser),
      } as any);

      const result = await service.findUserById(1);
      expect(result).toEqual(mockUser);
      expect(UserModel.query).toHaveBeenCalled();
    });

    it('should return falsy if user not found', async () => {
      jest.spyOn(UserModel, 'query').mockReturnValue({
        findOne: jest.fn().mockResolvedValue(undefined),
      } as any);

      const result = await service.findUserById(11);
      expect(result).toBeFalsy();
    });
  });

  describe('findAllUsers', () => {
    it('should return a list of non-deleted users if found', async () => {
      const mockUsers = [
        { id: 1, nome: 'Usuário de Teste 1', email: 'teste1@email.com' },
        { id: 2, nome: 'Usuário de Teste 2', email: 'teste2@email.com' },
        { id: 3, nome: 'Usuário de Teste 3', email: 'teste3@email.com' },
      ];

      jest.spyOn(UserModel, 'query').mockReturnValue({
        where: jest.fn().mockResolvedValue(mockUsers),
      } as any);

      const result = await service.findAllUsers();
      expect(result).toEqual(mockUsers);
      expect(UserModel.query).toHaveBeenCalled();
    });

    it('should return falsy if non-deleted users found', async () => {
      jest.spyOn(UserModel, 'query').mockReturnValue({
        where: jest.fn().mockResolvedValue(undefined),
      } as any);

      const result = await service.findAllUsers();
      expect(result).toBeFalsy();
    });
  });

  describe('createUser', () => {
    it('should create and return a new user', async () => {
      const newUser = {
        nome: 'Novo Usuário de Teste 2',
        email: 'teste2@email.com',
        rua: 'Rua 2',
        numero: '200',
        bairro: 'Bairro 2',
        complemento: 'Casa B',
        cidade: 'Fortaleza',
        estado: 'Ceará',
        cep: '60000-000',
        status: StatusEnum.ATIVO,
      };
      const createdUser = { id: 2, ...newUser };

      jest.spyOn(UserModel, 'query').mockReturnValue({
        insert: jest.fn().mockResolvedValue(createdUser),
      } as any);

      const result = await service.createUser(newUser);
      expect(result).toEqual(createdUser);
      expect(UserModel.query).toHaveBeenCalled();
      expect(UserModel.query().insert).toHaveBeenCalledWith(newUser);
    });
  });
});
