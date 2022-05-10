export const up = async (knex) => {
  return knex.schema
    .createTable('users', function (table) {
      table.increments('id').primary();
      table.string('first_name', 32).notNullable();
      table.string('last_name', 32).notNullable();
      table.string('email', 32).unique().notNullable();
      table.string('phone', 15).notNullable();
      table.string('password').notNullable();
    });
};

export const down = async (knex) => {
  return knex.schema
    .dropTable("users");
};