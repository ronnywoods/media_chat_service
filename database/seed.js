var config = require('../knexfile.js');
var configDev = config.development;
var knex = require('knex')(configDev);
var seedDb = require('./seedHelpers.js').seedDb;

var executeSeed = () => {
  return knex.migrate.rollback([config]).then(() => {
    return knex.migrate.latest([config]);
  }).then(() => {
    return seedDb(50, 100, 10000, knex).then(() => {
      knex.destroy();
      console.log('Database Seeded!');
    });
  });
};

executeSeed();
