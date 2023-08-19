const express = require("express");
var router = express.Router();
const kafkaSub = require("../kafka");

const NodeSubToMongo = require("./nodeSubToMongo.controller");

const { HEARTBEAT } = kafkaSub.consumer.events;

const topic = process.env.TOPIC_SUB_KAFKA;
const svcMongo = new NodeSubToMongo();

const init = async () => {
    
    await kafkaSub.consumer.subscribe({
        topic: topic,
        fromBeginning: false,
    });

    await kafkaSub.consumer.run({
        autoCommit: false,
        eachMessage: async ({ message }) => {
            data = {
                value: message.value ? message.value.toString() : null,
            };

            await svcMongo.saveMongo (message.value);
        },
    });

    await kafkaSub.consumer.seek({
        topic: topic,
        partition: 0,
        offset: 0,
    });
};

init();

module.exports = router;