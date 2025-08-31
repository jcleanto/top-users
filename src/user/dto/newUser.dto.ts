import { RoleEnum, StatusEnum } from "src/db/models/User.model";

export class newUser {
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
