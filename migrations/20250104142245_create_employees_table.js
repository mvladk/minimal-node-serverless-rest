/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable('employees', (table) => {
      table.increments('id').primary();
      table.string('name', 50).notNullable();
      table.string('familyName', 50).notNullable();
      table.string('position', 50).notNullable();
      table.string('address', 100).notNullable();
      table.string('phone', 20).notNullable();
      table.string('email', 100).notNullable();
    });
  };

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTableIfExists('employees');
  };
