const config = require('../knexfile');
const knex = require('knex')(config);

// It is better to avoid running migrations automatically
knex.migrate.latest([config]);

module.exports = knex;
