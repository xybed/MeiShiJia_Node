/**
 * Created by Administrator on 2017/6/27.
 */
'use strict';

const User = require('../../model/user/User');

async function queryUser(username, verify_code) {
    return await User.findAll({
        where: {
            username: username,
            verify_code: verify_code
        }
    });
}

let exp = {
    queryUser: queryUser
};

module.exports = exp;