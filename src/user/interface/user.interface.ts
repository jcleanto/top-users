import { StatusEnum } from "src/db/models/User.model";

export interface UserInterface {
  id: number;
  nome: string;
  email: string;
  rua: string;
  numero: string;
  bairro: string;
  complemento: string;
  cidade: string;
  estado: string;
  cep: string;
  senha: string | undefined;
  role: string;
  status: StatusEnum;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
}

export interface AuthUserInterface {
  id: number;
  nome: string;
  email: string;
  senha: string;
  role: string;
}