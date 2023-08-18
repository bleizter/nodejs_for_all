module.exports = {
    HOST: process.env.HOST_MYSQL,
    USER: process.env.USER_MYSQL,
    PASSWORD: process.env.PASSWORD_MYSQL,
    DB: process.env.DBNAME_MYSQL,
    dialect: process.env.DIALECT_MYSQL,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
    timezone: process.env.TZ
};