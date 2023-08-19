const db = require("@node-mongo/models");
const NodejsMongo = db.nodeMongo;

class NodeSubToMongoController {

    constructor () {
        this.saveMongo = this.saveMongo.bind(this);
    }

    async saveMongo (message) {
        try {
            var messageParse = JSON.parse(message);
            delete messageParse._id;

            const existingData = await NodejsMongo.findOne({
                kode: messageParse.kode
            });
    
            if (existingData) {
                console.log("data sudah ada di DB!!");
            } else {

                const newData = new NodejsMongo(messageParse);
                // const newData = messageParse;
                await newData.save(newData);
                console.log("data berhasil disubscribe dan tersimpan di DB");
                return true
            }
    
        } catch (e) {
            console.log(JSON.stringify(e.message));
            return false;
        }

    }

}
module.exports = NodeSubToMongoController;