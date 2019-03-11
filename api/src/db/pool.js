const Pool = require('pg').Pool

const pool = new Pool({
    user: 'postgres',
    host: 'area_bdd',
    database: 'postgres',
    password: 'pgpass',
    port: 5432,
})

export default pool;