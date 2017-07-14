/**
 * Created by Administrator on 2017/7/14.
 */
'use strict';

const db = require('../../db');

module.exports = db.defineModel('user_token', {
    username: db.STRING(255),
    token: db.STRING(255),
    deadline: db.STRING(255)
});