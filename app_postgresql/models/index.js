const dbConf = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConf.DB, dbConf.USER, dbConf.PASSWORD, {
    host: dbConf.HOST,
    dialect: dbConf.dialect,
    operatorsAliases: false,
    // define: {
    //     timestamps: false
    // },
    pool: {
        max: dbConf.pool.max,
        min: dbConf.pool.min,
        acquire: dbConf.pool.acquire,
        idle: dbConf.pool.idle
    },
    dialectOptions: {},
    timezone: dbConf.timezone
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.nodePostgresql = require("./nodePostgresql.model.js")(sequelize, Sequelize);

module.exports = db;