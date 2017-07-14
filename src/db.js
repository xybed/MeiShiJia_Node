/**
 * Created by Administrator on 2017/7/12.
 */
'use strict';

const Sequelize = require('sequelize');
const dbConfig = require('../resources/db-config');

let sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, {
    host: dbConfig.host,
    dialect: dbConfig.dialect,
    pool: {
        max: 5,
        min: 0,
        idle: 10000
    },
    isolationLevel: Sequelize.Transaction.ISOLATION_LEVELS.SERIALIZABLE
});

function defineModel(name, attributes) {
    return sequelize.define(name, attributes, {
        tableName:name,
        timestamps:false
    });
}

const TYPES = ['STRING', 'INTEGER', 'BIGINT', 'TEXT', 'DOUBLE', 'DATEONLY', 'BOOLEAN'];

let exp = {
    defineModel:defineModel,
    sequelize: sequelize
};

for (let type of TYPES){
    exp[type] = Sequelize[type];
}

module.exports = exp;