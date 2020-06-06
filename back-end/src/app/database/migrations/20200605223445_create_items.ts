import Knex from "knex";

export async function up(knex: Knex): Promise<any> {
    return knex.schema.createTable('items', table => {
        table.increments('id').primary();
        table.string('image').notNullable();
        table.string('title').notNullable();
        table.dateTime('created_at').defaultTo(knex.fn.now());
        table.dateTime('updated_at').defaultTo(null);
    });
}

export async function down(knex: Knex): Promise<any> {
    return knex.schema.dropTable('items');
}
