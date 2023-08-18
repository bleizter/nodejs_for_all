const db = require("../models");
const NodejsMongo = db.nodeMongo;


exports.findAll = (req, res) => {
    const kode = req.query.kode;
    var condition = kode ? { kode: { $regex: new RegExp(kode), $options: "i" } } : {};

    NodejsMongo.find(condition)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                err.message || "Gagal ambil data !!!"
            });
        });
};


exports.findOne = (req, res) => {
    const id = req.params.id;

    NodejsMongo.findOne({ 'kode': id })
    .then(data => {
        if (!data)
            res.status(404).send({ message: "Data tidak ada untuk kode " + id });
        else res.send(data);
    })
    .catch(err => {
        res
        .status(500)
        .send({ message: "Gagal mengambil data dengan kode " + id });
    });
};

exports.create = (req, res) => {
    // Validate request
    if (!req.body.kode && !req.body.nama) {
        res.status(400).send({ message: "inputan kode dan nama tidak boleh kosong!!!" });
        return;
    }

    const nodejsMongo = new NodejsMongo({
        kode: req.body.kode,
        nama: req.body.nama
    });

    nodejsMongo
    .save(nodejsMongo)
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message:
            err.message
        });
    });
};

exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Data tidak boleh kosong!!!"
        });
    }

    const id = req.params.id;

    NodejsMongo.findOneAndUpdate({ 'kode': id }, req.body, { useFindAndModify: false })
    .then(data => {
        if (!data) {
            res.status(404).send({
                message: `Gagal update kode =${id}`
            });
        } else res.send({ message: "Update sukses" });
    })
    .catch(err => {
        res.status(500).send({
            message: "Error update kode =" + id
        });
    });
};