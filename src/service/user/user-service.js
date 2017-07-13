/**
 * Created by Administrator on 2017/7/12.
 */
'use strict';

const userDao = require('../../dao/user/user-dao');

async function login(username) {
    return await userDao.verifyRegister(username);
}

async function register(province, city) {
    return await userDao.queryByProvince(province, city);
}

let exp = {
    login: login,
    register: register
};

module.exports = exp;