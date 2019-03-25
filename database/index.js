var config = require('../knexfile.js');
if (process.env.NODE_ENV === 'test') {
  var configEnv = config.test;
} else {
  var configEnv = config.development;
}
var knex = require('knex')(configEnv);

module.exports = knex;

if (process.env.NODE_ENV !== 'test') {
  knex.migrate.latest([config]);
}