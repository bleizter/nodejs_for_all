module.exports = (sequelize, Sequelize) => {
    const NodeMysql = sequelize.define(process.env.TABLE_MYSQL, {
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
        tableName: process.env.TABLE_MYSQL
    });

    return NodeMysql;
};