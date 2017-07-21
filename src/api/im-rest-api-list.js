/**
 * Created by Administrator on 2017/7/21.
 */
'use strict';

/**
 * 此文件记录腾讯REST api的接口列表
 * */

/**
 * 单个帐号导入
 */
let accountImport = {
    servicename: 'im_open_login_svc',
    command: 'account_import'
};

/**
 * 批量帐号导入
 */
let multiAccountImport = {
    servicename: 'im_open_login_svc',
    command: 'multiaccount_import'
};

/**
 * 发送单聊消息
 */
let sendMsg = {
    servicename: 'openim',
    command: 'sendmsg'
};

let exp = {
    accountImport: accountImport,
    multiAccountImport: multiAccountImport,
    sendMsg: sendMsg
};

module.exports = exp;