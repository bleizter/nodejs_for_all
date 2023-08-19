const NodePubController = require('../controllers/nodePub.controller');

module.exports = app => {
    const nodekafkas = new NodePubController();

    var router = require("express").Router();
    router.post("/publish", nodekafkas.publishData);

    app.use('/api/nodekafkas', router);
};