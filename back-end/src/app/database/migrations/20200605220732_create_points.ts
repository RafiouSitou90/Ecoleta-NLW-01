import Knex from "knex";

export async function up(knex: Knex): Promise<any> {
    return knex.schema.createTable('points', table => {
        table.increments('id').primary();
        table.string('image').notNullable();
        table.string('name').notNullable();
        table
            .string('email')
            .unique()
            .notNullable();
        table.string('whatsapp').notNullable();
        table.decimal('latitude').notNullable();
        table.decimal('longitude').notNullable();
        table.string('city').notNullable();
        table.string('state', 2).notNullable();
        table.dateTime('created_at').defaultTo(knex.fn.now()).notNullable();
        table.dateTime('updated_at').defaultTo(null).nullable();

    });
}

export async function down(knex: Knex): Promise<any> {
    return knex.schema.dropTable('points');
}
