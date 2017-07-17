/**
 * Created by Administrator on 2017/7/17.
 */
'use strict';

const tokenDao = require('../../dao/user/token-dao');

async function queryToken(token) {
    return await tokenDao.queryToken(token);
}

let exp = {
    queryToken: queryToken
};

module.exports = exp;