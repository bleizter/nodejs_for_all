const dbConf = require("../config/db.config.js");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConf.url;
db.nodeMongo = require("./nodeMongo.model.js")(mongoose);

module.exports = db;