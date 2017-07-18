/**
 * Created by Administrator on 2017/7/18.
 */
'use strict';

const db = require('../../db');

const Category = db.defineModel('category', {
    id:{
        type: db.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    level: db.INTEGER,
    fid: db.INTEGER,
    name: db.STRING(20)
});

module.exports = Category;