module.exports = {
    host: process.env.WHITELISTDB_PGHOST || '172.18.133.234',
    port: process.env.WHITELISTDB_PGPORT || '5432',
    user: process.env.WHITELISTDB_PGUSER || 'dgb' ,
    password: process.env.WHITELISTDB_PGPASSWORD || 'P@ssw0rd',
    database: process.env.WHITELISTDB_PGDATABASE || 'whitelist',
    idleTimeoutMillis: process.env.WHITELISTDB_IDLETIMEOUT || 15000,
    max: process.env.WHITELISTDB_MAXPOOL|| 5
}