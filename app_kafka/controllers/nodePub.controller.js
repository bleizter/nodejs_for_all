const kafkaPub = require('../kafka.js');

class NodePubController {

    constructor() {
        this.publisher = kafkaPub.producer;
        this.publishData = this.publishData.bind(this);
    }

    async publishData (req,res) {
        try {
            var data = req.body;
            console.log(data);

            await this.publisher.send({
                topic: process.env.TOPIC_PUB_KAFKA,
                messages: [
                    {
                        key: data.kode,
                        value: JSON.stringify(data)
                    }
                ]
            });

            return res.status(404).send({
                message: `sukses publish data`
            });
        } catch (e) {
            return res.send(e.message)
        }
    }

}

module.exports = NodePubController;