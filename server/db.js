const Pool = require('pg').Pool;

const pool = new Pool({
    user: 'postgres',
    password: 'Rm300999',
    host: 'localhost',
    port: 5432,
    database: 'mvp_db'
});

module.exports = pool;