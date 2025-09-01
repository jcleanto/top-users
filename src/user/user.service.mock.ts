import type { Response } from 'express';
import { RoleEnum, StatusEnum } from "../db/models/User.model";
import { UserInterface } from "./interface/user.interface";
import { UserService } from "./user.service";

export const userMock: UserInterface = {
  id: 1,
  nome: 'Usuário de Teste 1',
  email: 'teste1@email.com',
  rua: 'Rua 1',
  numero: '100',
  bairro: 'Bairro 1',
  complemento: 'Casa A',
  cidade: 'Fortaleza',
  estado: 'Ceará',
  cep: '60000-000',
  senha: '12345678',
  role: RoleEnum.USER,
  status: StatusEnum.ATIVO,
  isDeleted: false,
  createdAt: null,
  updatedAt: null,
  deletedAt: null
};

export const statusResponseMock = {
  send: jest.fn((x) => x),
  json: jest.fn((x) => x),
  end: jest.fn(),
};

export const responseMock = {
  status: jest.fn((x) => statusResponseMock),
  send: jest.fn((x) => x),
  json: jest.fn((x) => x),
  end: jest.fn(),
} as unknown as Response;

export const userServiceMock = {
    provide: UserService,
    useValue: {
        findAllUsers: jest.fn().mockResolvedValue([userMock]),
        findUserById: jest.fn().mockResolvedValue(userMock),
        createUser: jest.fn().mockResolvedValue(userMock),
        updateUser: jest.fn().mockResolvedValue(userMock),
        deleteUser: jest.fn().mockResolvedValue(true)
    }
}
