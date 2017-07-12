/**
 * Created by Administrator on 2017/7/12.
 */
'use strict'

const userDao = require('../../dao/user/user-dao');

async function login(username, verify_code) {
    return await userDao.queryUser(username, verify_code);
}

let exp = {
    login: login
};

module.exports = exp;