const { Kafka, logLevel, CompressionTypes } = require('kafkajs');

// KAFKA
const config = {
    clientId: process.env.ID_KAFKA,
    brokers: [process.env.HOST_KAFKA],
    connectionTimeout: 1000,
    requestTimeout: 30000,
    ssl: false,
    logLevel: logLevel.INFO,
    retry: {
        maxRetryTime: 300000,
        initialRetryTime: 3000,
        retries: 20,
        restartOnFailure: async () => true,
    },
};
const kafka = new Kafka(config);
const admin = kafka.admin();
module.exports.admin = admin;

// PRODUCER
const producerConfig = {
    allowAutoTopicCreation: true,
    transactionTimeout: 6000000,
};
const producer = kafka.producer(producerConfig);
module.exports.producer = producer;

// CONSUMER
const consumerConfig = {
    groupId: process.env.GROUP_SUB_KAFKA,
    sessionTimeout: 1800000,
    allowAutoTopicCreation: true,
};
const consumer = kafka.consumer(consumerConfig);
module.exports.consumer = consumer;

module.exports.connect = () => {
    return Promise.all([
        new Promise((resolve, reject) => {
            admin
            .connect()
            .then(() => {
                console.log('Kafka admin got connected.');
                resolve();
            })
            .catch(() => {
                console.log('Kafka admin connection error.');
                reject();
            });
        }),
        new Promise((resolve, reject) => {
            producer
            .connect()
            .then(() => {
                console.log('Kafka producer got connected.');
                resolve();
            })
            .catch(() => {
                console.log('Kafka producer connection error.');
                reject();
            });
        }),
        new Promise((resolve, reject) => {
            consumer
            .connect()
            .then(() => {
                console.log('Kafka consumer got connected.');
                resolve();
            })
            .catch(() => {
                console.log('Kafka consumer connection error.');
                reject();
            });
        }),
    ]);
};

module.exports.disconnect = () => {
    admin
    .disconnect()
    .then(() => {
        console.log('Kafka admin got disconnected.');
    })
    .catch(() => {
        console.log('Kafka admin disconnection error.');
    });
    producer
    .disconnect()
    .then(() => {
        console.log('Kafka producer got disconnected.');
    })
    .catch(() => {
        console.log('Kafka producer disconnection error.');
    });
    consumer
    .disconnect()
    .then(() => {
        console.log('Kafka consumer got disconnected.');
    })
    .catch(() => {
        console.log('Kafka consumer disconnection error.');
    });
};

module.exports.send = (topic, messages) => {
    return new Promise((resolve, reject) => {
        producer
        .send({
            topic: topic,
            messages: messages,
            timeout: 1800000,
            compression: CompressionTypes.GZIP,
        })
        .then((data) => {
            resolve(data);
        })
        .catch((error) => {
            reject(error);
        });
    });
};

module.exports.sendBatch = (topicMessages) => {
    return new Promise((resolve, reject) => {
        producer
        .sendBatch({
            topicMessages: topicMessages,
            timeout: 1800000,
            compression: CompressionTypes.GZIP,
        })
        .then((data) => {
            resolve(data);
        })
        .catch((error) => {
            reject(error);
        });
    });
};