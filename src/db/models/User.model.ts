import { BaseModel } from './Base.model';

export enum StatusEnum {
  ATIVO = 'ativo',
  INATIVO = 'inativo'
}

export enum RoleEnum {
  USER = 'user',
  ADMIN = 'admin',
  CUSTOMER = 'customer',
  SYSTEM = 'system',
}

export class UserModel extends BaseModel {
  static tableName = 'users';
  nome: string;
  email: string;
  rua: string;
  numero: string;
  bairro: string;
  complemento: string;
  cidade: string;
  estado: string;
  cep: string;
  senha: string;
  role: RoleEnum;
  status: StatusEnum;
}
