import Knex from 'knex';
const knexConfig = require('../../../../knexfile');

const appConfig = process.env.NODE_ENV === 'test' ? knexConfig.test : knexConfig.development;

const DBConnection = Knex(appConfig);

export default DBConnection;
