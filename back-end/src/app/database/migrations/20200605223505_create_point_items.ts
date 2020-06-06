import * as Knex from "knex";

export async function up(knex: Knex): Promise<any> {
    return knex.schema.createTable('point_items', table => {
        table.increments('id').primary();
        table.integer('point_id')
            .references('id')
            .inTable('points')
            .notNullable();
        table.integer('item_id')
            .references('id')
            .inTable('items')
            .notNullable();
        table.dateTime('created_at').defaultTo(knex.fn.now());
        table.dateTime('updated_at').defaultTo(null);
    });
}

export async function down(knex: Knex): Promise<any> {
    return knex.schema.dropTable('point_items');
}
