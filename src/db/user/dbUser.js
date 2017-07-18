/**
 * Created by Administrator on 2017/7/12.
 */
'use strict';

const db = require('../../db');

const User = db.defineModel('user', {
    id:{
        type: db.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username: db.STRING(255),
    password: db.STRING(255),
    verify_code: db.STRING(6),
    register_date: db.STRING(19),
    avatar: db.STRING(255),
    real_name: db.STRING(255),
    nickname: db.STRING(255),
    mobile_phone: db.STRING(11),
    sex: db.INTEGER,
    birthday: db.STRING(10),
    email: db.STRING(255),
    province: db.STRING(255),
    city: db.STRING(255),
    address: db.STRING(255),
    signature: db.STRING(255),
    principal_id: db.INTEGER
});

module.exports = User;