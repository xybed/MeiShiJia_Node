/**
 * Created by Administrator on 2017/7/18.
 */
'use strict';

const imDao = require('../../dao/im/im-dao');

async function queryContacts(id) {
    await imDao.queryContacts();
}

let exp = {
    queryContacts: queryContacts
};

module.exports = exp;