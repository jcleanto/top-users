import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("users").del();

    // Inserts seed entries
    await knex("users").insert([
        { id: 1, nome: "Administrador", email: "administrador@email.com", rua: "Rua 1", numero: "100", bairro: "Bairro 1", complemento: "Casa A", cidade: "Fortaleza", estado: "Ceará", cep: "60000-000", status: "ativo" },
        { id: 2, nome: "João", email: "joao@email.com", rua: "Rua 2", numero: "200", bairro: "Bairro 2", complemento: "Casa B", cidade: "Fortaleza", estado: "Ceará", cep: "60000-000", status: "ativo" },
        { id: 3, nome: "Maria", email: "maria@email.com", rua: "Rua 3", numero: "300", bairro: "Bairro 3", complemento: "Casa C", cidade: "Fortaleza", estado: "Ceará", cep: "60000-000", status: "ativo" },
    ]);
};
