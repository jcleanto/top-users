import { StatusEnum } from "src/db/models/User.model";

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
  status: StatusEnum;
}
