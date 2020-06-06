import Knex from "knex";

export async function seed(knex: Knex) {
    await knex('items').insert([
        { title: 'Lamps', image: 'lamps.svg' },
        { title: 'Batteries', image: 'batteries.svg' },
        { title: 'Electronics waste', image: 'electronics.svg' },
        { title: 'Organics waste', image: 'organics.svg' },
        { title: 'Papers', image: 'papers.svg' },
        { title: 'Kitchens oil', image: 'oils.svg' }
    ]);
}
