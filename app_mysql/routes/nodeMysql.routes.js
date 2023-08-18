module.exports = app => {
    const nodemysqls = require("../controllers/nodeMysql.controller.js");

    var router = require("express").Router();

    router.get("/", nodemysqls.findAll);
    router.get("/:id", nodemysqls.findOne);
    router.post("/", nodemysqls.create);
    router.put("/:id", nodemysqls.update);

    app.use('/api/nodemysqls', router);
};