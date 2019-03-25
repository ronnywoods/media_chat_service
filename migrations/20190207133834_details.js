exports.up = function(knex, Promise) {
  return Promise.all([

    knex.schema.createTable('users', (table) => {
      table.string('username', 50).primary();
      table.string('image', 500);
      table.integer('subscribers');
    }),

    knex.schema.createTable('videos', (table) => {
      table.increments('id').primary();
      table.string('channel', 50).references('username').inTable('users');
      table.string('description', 4000);
      table.dateTime('publishDate');
    }),

    knex.schema.createTable('comments', (table) => {
      table.increments('id').primary();
      table.dateTime('commentDate');
      table.integer('videoId').references('id').inTable('videos');
      table.integer('parentId');
      table.string('username', 50).references('username').inTable('users');
      table.string('text', 4000);
      table.integer('likes');
      table.integer('dislikes');
    }),

    knex.schema.createTable('commentfeelings', (table) => {
      table.string('username', 50).references('username').inTable('users');
      table.integer('commentId').references('id').inTable('comments');
      table.boolean('feeling');
    }),

    knex.schema.createTable('subscribes', (table) => {
      table.string('username', 50).references('username').inTable('users');
      table.string('channel', 50).references('username').inTable('users');
    })

  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('subscribes'),
    knex.schema.dropTable('commentfeelings'),
    knex.schema.dropTable('comments'),
    knex.schema.dropTable('videos'),
    knex.schema.dropTable('users')
  ]);
};