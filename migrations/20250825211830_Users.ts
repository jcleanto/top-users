import type { Knex } from "knex";

const tableName = 'users';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(tableName, (t) => {
    t.increments('id');
    t.string('nome');
    t.string('email').unique();
    t.string('rua');
    t.string('numero');
    t.string('bairro');
    t.string('complemento');
    t.string('cidade');
    t.string('estado');
    t.string('cep');
    t.enum('status', ['ativo', 'inativo']).notNullable();
    t.boolean('is_deleted').defaultTo(false);
    t.timestamp('created_at').defaultTo(knex.fn.now());
    t.timestamp('updated_at').defaultTo(knex.fn.now());
    t.timestamp('deleted_at');
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable(tableName);
}
