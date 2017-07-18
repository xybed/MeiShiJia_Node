/**
 * Created by Administrator on 2017/7/18.
 */
'use strict';

const db = require('../../db');

const Food = db.defineModel('food', {
    id:{
        type: db.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    food_url: db.STRING(100),
    food_name: db.STRING(100),
    food_image: db.STRING(100),
    com_score: db.DOUBLE,
    comments: db.INTEGER,
    great_com: db.INTEGER,
    good_com: db.INTEGER,
    notbad_com: db.INTEGER,
    food_makes: db.INTEGER,
    author: db.STRING(50),
    summary: db.TEXT,
    material: db.TEXT,
    food_make_way: db.TEXT,
    tips: db.TEXT
});

module.exports = Food;