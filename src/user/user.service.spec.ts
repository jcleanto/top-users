import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { DatabaseModule } from '../db/database.module';
import { RoleEnum, StatusEnum, UserModel } from '../db/models/User.model';

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
        senha: '12345678',
        role: RoleEnum.USER,
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

  describe('updateUser', () => {
    it('should update an user', async () => {
      const updateUser = {
        id: 2,
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
        senha: '12345678',
        role: RoleEnum.USER,
      };
      const updatedUser = { nome: 'Novo Usuário de Teste 22', ...updateUser };

      jest.spyOn(UserModel, 'query').mockReturnValue({
        update: jest.fn().mockResolvedValue(updatedUser).mockReturnValue({
          where: jest.fn()
        } as any),
      } as any);

      const result = await service.updateUser(updateUser.id, updateUser);
      expect(result).toBeTruthy();
      expect(UserModel.query).toHaveBeenCalled();
      expect(UserModel.query().update).toHaveBeenCalledWith(updateUser);
    });
  });

  describe('deleteUser', () => {
    it('should delete an user', async () => {
      const deleteUser = {
        id: 2,
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
        role: RoleEnum.USER,
      };
      const deletedUser = { isDeleted: true, deletedAt: new Date().toISOString() };

      jest.spyOn(UserModel, 'query').mockReturnValue({
        update: jest.fn().mockResolvedValue(deleteUser).mockReturnValue({
          where: jest.fn()
        } as any),
      } as any);

      const result = await service.deleteUser(deleteUser.id);
      expect(result).toBeTruthy();
      expect(UserModel.query).toHaveBeenCalled();
      expect(UserModel.query().update).toHaveBeenCalledWith(deletedUser);
    });
  });

  describe('validateUser', () => {
    it('should validate an user for authentication', async () => {
      const validateUser = {
        id: 2,
        nome: 'Novo Usuário de Teste 2',
        email: 'teste2@email.com',
        rua: 'Rua 2',
        numero: '200',
        bairro: 'Bairro 2',
        complemento: 'Casa B',
        cidade: 'Fortaleza',
        estado: 'Ceará',
        cep: '60000-000',
        senha: '12345678',
        status: StatusEnum.ATIVO,
        role: RoleEnum.USER,
      };
      const validatedUser = { ...validateUser, senha: undefined };

      jest.spyOn(UserModel, 'query').mockReturnValue({
        findOne: jest.fn().mockResolvedValue(validateUser),
      } as any);

      const result = await service.validateUser(validateUser.email, validateUser.senha);
      expect(result).toEqual(validatedUser);
      expect(UserModel.query).toHaveBeenCalled();
      expect(UserModel.query().findOne).toHaveBeenCalledWith({ email: validateUser.email, senha: validateUser.senha, isDeleted: false, status: StatusEnum.ATIVO });
    });
  });
});
