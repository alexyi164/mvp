const pg = require('pg');
const Pool = require('pg').Pool;

const PGUSER = 'alexyi164';
const PGDATABASE = 'boarddash';

let config = {
  host: 'localhost',
  port: '5432',
  user: PGUSER,
  database: PGDATABASE,
  max: 20,
  password: 'password'
}

const pool = new Pool(config);

const getAllInfo = (callback) => {
  let sqlString = 'SELECT * FROM allstates';
  pool.query(sqlString, (error, results) => {
    if (error) {
      return callback(error);
    }
    return callback(error, results.rows);
  })
}

module.exports = { getAllInfo }
