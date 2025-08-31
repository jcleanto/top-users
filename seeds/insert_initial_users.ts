import type { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("users").del();

    // Inserts seed entries
    await knex("users").insert([
        { nome: "Administrador", email: "administrador@email.com", rua: "Rua 1", numero: "100", bairro: "Bairro 1", complemento: "Casa A", cidade: "Fortaleza", estado: "Ceará", cep: "60000-000", senha: "12345678", role: "admin", status: "ativo" },
        { nome: "João", email: "joao@email.com", rua: "Rua 2", numero: "200", bairro: "Bairro 2", complemento: "Casa B", cidade: "Fortaleza", estado: "Ceará", cep: "60000-000", senha: "12345678", role: "user", status: "ativo" },
        { nome: "Maria", email: "maria@email.com", rua: "Rua 3", numero: "300", bairro: "Bairro 3", complemento: "Casa C", cidade: "Fortaleza", estado: "Ceará", cep: "60000-000", senha: "12345678", role: "user", status: "ativo" },
    ]);
};
