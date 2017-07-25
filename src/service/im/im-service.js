/**
 * Created by Administrator on 2017/7/18.
 */
'use strict';

const imDao = require('../../dao/im/im-dao');
const CONSTANTS = require('../../constants/constants');
const principalModel = require('../../model/im/principal-model');

async function queryContacts(id) {
    let result = await imDao.queryContacts(id);
    let contactsArray = [];
    for(let i=0;i<result.length;i++){
        result[i].avatar = CONSTANTS.baseImgUrl + result[i].avatar;
        contactsArray[i] = result[i];
    }
    return contactsArray;
}

async function queryContactsDetail(userId, friendId) {
    let result = await imDao.queryContactsDetail(userId, friendId);
    result[0].avatar = CONSTANTS.baseImgUrl + result[0].avatar;
    return result[0];
}

async function updateRemark(userId, friendId, remark) {
    let result = await imDao.updateRemark(userId, friendId, remark);
    return result[0];
}

async function queryPrincipalInfo(id, principalId) {
    let principal = await imDao.queryPrincipal(principalId);
    let remark = await imDao.queryPrincipalRemark(id, principal.id);
    principalModel.principal_user_id = principal.id;
    principalModel.avatar = principal.avatar;
    principalModel.principal_id = principal.principal_id;
    if(remark[0]){
        principalModel.remark = remark[0];
    }else {
        principalModel.remark = principal.nickname;
    }
    return principalModel;
}

let exp = {
    queryContacts: queryContacts,
    queryContactsDetail: queryContactsDetail,
    updateRemark: updateRemark,
    queryPrincipalInfo: queryPrincipalInfo
};

module.exports = exp;