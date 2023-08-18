module.exports = app => {
    const nodemongos = require("../controllers/nodeMongo.controller.js");

    var router = require("express").Router();

    router.get("/", nodemongos.findAll);
    router.get("/:id", nodemongos.findOne);
    router.post("/", nodemongos.create);
    router.put("/:id", nodemongos.update);

    app.use('/api/nodemongos', router);
};