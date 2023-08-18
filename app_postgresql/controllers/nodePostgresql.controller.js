const db = require("../models");
const NodejsPostgresql = db.nodePostgresql;
const Op = db.Sequelize.Op;


exports.findAll = (req, res) => {
    const kode = req.query.kode;
    var condition = kode ? { kode: { [Op.like]: `%${kode}%` } } : null;

    NodejsPostgresql.findAll({ where: condition })
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

    NodejsPostgresql.findOne({ where: { kode: id } })
    .then(data => {
        if (data) {
            res.send(data);
        } else {
            res.status(404).send({
                message: `Data tidak ada untuk kode = ${id}.`
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "Gagal mengambil data dengan kode =" + id
        });
    });
};

exports.create = (req, res) => {
    // Validate request
    if (!req.body.kode && !req.body.nama) {
        res.status(400).send({
            message: "inputan kode dan nama tidak boleh kosong!!!"
        });
        return;
    }

    const tbl_nodePostgresql = {
        kode: req.body.kode,
        nama: req.body.nama
    };

    NodejsPostgresql.create(tbl_nodePostgresql)
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
    const id = req.params.id;

    NodejsPostgresql.update(req.body, {where: { kode: id }})
    .then(num => {
        if (num == 1) {
            res.send({
                message: "update sukses"
            });
        } else {
            res.send({
                message: `gagal update kode =${id}`
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "gagal update kode = " + id
        });
    });
};