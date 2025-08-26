import { BaseModel } from './Base.model';

export enum StatusEnum {
  ATIVO = 'ativo',
  INATIVO = 'inativo'
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
  status: StatusEnum;
}
