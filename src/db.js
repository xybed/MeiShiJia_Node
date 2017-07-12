/**
 * Created by Administrator on 2017/7/12.
 */
'use strict'

const Sequelize = require('sequelize');
const dbConfig = require('../resources/db-config');

var sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, {
    host: dbConfig.host,
    dialect: dbConfig.dialect,
    pool: {
        max: 5,
        min: 0,
        idle: 10000
    }
});

function defineModel(name, attributes) {
    return sequelize.define(name, attributes, {
        tableName:name,
        timestamps:false
    });
}

const TYPES = ['STRING', 'INTEGER', 'BIGINT', 'TEXT', 'DOUBLE', 'DATEONLY', 'BOOLEAN'];

let exp = {
    defineModel:defineModel
};

for (let type of TYPES){
    exp[type] = Sequelize[type];
}

module.exports = exp;