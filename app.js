require('dotenv').config();

const express = require('express');
const cors = require('cors');

const app = express()

var corsOption = {
    origin: "http://localhost:13031"
};

app.use(cors(corsOption));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// cek koneksi mysql
const db_mysql = require("./app_mysql/models");
db_mysql.sequelize.sync({ force: false, alter: false })
    .then(() => {
        console.log("koneksi mysql ok");
    })
    .catch((err) => {
        console.log("koneksi mysql gagal: " + err.message);
    });

// cek koneksi postgreSql
const db_pg = require("./app_postgresql/models");
db_pg.sequelize.sync({ force: false, alter: false })
    .then(() => {
        console.log("koneksi postgre ok");
    })
    .catch((err) => {
        console.log("koneksi postgre gagal: " + err.message);
    });

// cek koneksi mongodb
const db_mongo = require("./app_mongodb/models");
db_mongo.mongoose
    .connect(db_mongo.url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log("koneksi mongodb ok");
    })
    .catch(err => {
        console.log("koneksi mongodb gagal", err);
        process.exit();
    });

app.get("/", (req, res) => {
    res.json({ message: "testing" });
});

// route mysql
require("./app_mysql/routes/nodeMysql.routes")(app);

// route postgreSql
require("./app_postgresql/routes/nodePostgresql.routes")(app);

// route mongoDB
require("./app_mongodb/routes/nodeMongo.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT_API;
app.listen(PORT, () => {
    console.log(`Server port ${PORT}.`);
});