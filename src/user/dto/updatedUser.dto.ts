import { StatusEnum } from "src/db/models/User.model";

export class updatedUser {
  nome?: string;
  email?: string;
  rua?: string;
  numero?: string;
  bairro?: string;
  complemento?: string;
  cidade?: string;
  estado?: string;
  cep?: string;
  status?: StatusEnum;
  isDeleted?: boolean;
  deletedAt?: string;
}
