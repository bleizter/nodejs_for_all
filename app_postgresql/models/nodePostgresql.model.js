module.exports = (sequelize, Sequelize) => {
    const NodePostgresql = sequelize.define(process.env.TABLE_PG, {
        id : {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        kode: {
            type: Sequelize.STRING
        },
        nama: {
            type: Sequelize.STRING
        },

        // createAt: {
        //     type: Sequelize.DATE,
        //     defaultValue: Sequelize.NOW()
        // },
        // updateAt: {
        //     type: Sequelize.DATE,
        //     defaultValue: Sequelize.NOW()
        // }
    },{
        tableName: process.env.TABLE_PG
    });

    return NodePostgresql;
};