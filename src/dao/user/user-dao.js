/**
 * Created by Administrator on 2017/6/27.
 */
'use strict';

const Sequelize = require('sequelize');
const User = require('../../db/user/dbUser');

async function verifyRegister(username) {
    return await User.findAll({
        attributes: [[Sequelize.fn('COUNT', Sequelize.col('*')), 'count']],
        where: {username: username}
    });
}

async function queryUser(username, verify_code) {
    return await User.findAll({
        where: {
            username: username,
            verify_code: verify_code
        }
    });
}

async function queryByProvince(province, city) {
    return await User.findAll({
        where: {
            province: province,
            city: city
        }
    });
}

let exp = {
    verifyRegister: verifyRegister,
    queryUser: queryUser,
    queryByProvince: queryByProvince
};

module.exports = exp;