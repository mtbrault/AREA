var knex = require('knex')({
    client: 'postgres',
    connection: {
        host: 'area_bdd',
        port: 5432,
        user: 'postgres',
        password: 'pgpass',
        database: 'postgres'
    }
});

export default knex;