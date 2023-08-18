module.exports = app => {
    const nodepostgresql = require("../controllers/nodePostgresql.controller.js");

    var router = require("express").Router();

    router.get("/", nodepostgresql.findAll);
    router.get("/:id", nodepostgresql.findOne);
    router.post("/", nodepostgresql.create);
    router.put("/:id", nodepostgresql.update);

    app.use('/api/nodepostgresql', router);
};