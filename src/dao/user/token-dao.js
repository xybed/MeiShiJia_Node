/**
 * Created by Administrator on 2017/7/17.
 */
'use strict';

const UserToken = require('../../db/user/dbUserToken');

async function queryToken(token) {
    return await UserToken.findOne({
        where: {
            token: token
        }
    });
}

let exp = {
    queryToken: queryToken
};

module.exports = exp;