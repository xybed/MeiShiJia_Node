/**
 * Created by Administrator on 2017/7/12.
 */
'use strict';

const userDao = require('../../dao/user/user-dao');
const crypto = require('crypto');
const md5 = crypto.createHash('md5');

async function register(username, password, verifyCode) {
    let instance = await userDao.verifyRegister(username);
    let isRegister = instance.get('isRegister');
    if(isRegister === 1){
        instance = await userDao.verifyPassword(username, password);
        let passwordIsCorrect = instance.get('passwordIsCorrect');
        if(passwordIsCorrect === 1){
            return 3;
        }else {
            return 2;
        }
    }
    return await userDao.register(username, password, verifyCode);
}

async function login(username, password) {
    let user = await userDao.login(username, password);
    if(user){
        let time = Date.now();
        md5.update(username + time);
        let deadline = time + 7 * 24 * 60 * 60 * 1000;
        await userDao.insertOrUpdateToken(username, md5.digest('hex'), deadline);


    }
}

let exp = {
    register: register,
    login: login,
};

module.exports = exp;