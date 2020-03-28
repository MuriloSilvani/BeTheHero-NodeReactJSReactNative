
exports.up = function (knex) {
    return knex.schema.createTable('messages', function (table) {
        table.increments();

        table.string('message').notNullable();
        table.date('date').notNullable();

        table.string('from').notNullable();

        table.string('hero_id').notNullable();

        table.integer('incident_id').notNullable();
        table.foreign('incident_id').references('id').inTable('incidents');
    })
};

exports.down = function (knex) {
    return knex.schema.dropTable('messages');
};
