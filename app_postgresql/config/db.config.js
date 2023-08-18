module.exports = {
    HOST: process.env.HOST_PG,
    USER: process.env.USER_PG,
    PASSWORD: process.env.PASSWORD_PG,
    DB: process.env.DBNAME_PG,
    dialect: process.env.DIALECT_PG,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
    timezone: process.env.TZ
};