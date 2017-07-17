/**
 * Created by Administrator on 2017/7/12.
 */
'use strict';

const userDao = require('../../dao/user/user-dao');
const crypto = require('crypto');
const md5 = crypto.createHash('md5');
const userModel = require('../../model/user/user-model');
const CONSTANTS = require('../../constants/constants');

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
        let token = md5.digest('hex');
        let deadline = time + 7 * 24 * 60 * 60 * 1000;
        await userDao.insertOrUpdateToken(username, token, deadline);

        userModel.id = user.id;
        userModel.username = user.username;
        userModel.avatar = CONSTANTS.baseImgUrl + user.avatar;
        userModel.real_name = user.real_name;
        userModel.nickname = user.nickname;
        userModel.mobile_phone = user.mobile_phone;
        userModel.sex = user.sex;
        userModel.birthday = user.birthday;
        userModel.email = user.email;
        userModel.province = user.province;
        userModel.city = user.city;
        userModel.address = user.address;
        userModel.signature = user.signature;
        userModel.principal_id = user.principal_id;
        userModel.token = token;
    }else {
        return null;
    }
    return userModel;
}

async function logout(token) {
    await userDao.logout(token);
}

async function updatePassword(username, password) {
    let result = await userDao.updatePassword(username, password);
    return result[0];
}

async function updateUser(user) {
    let result = await userDao.updateUser(user);
    return result[0];
}

async function queryAvatar(userId) {
    return await userDao.queryAvatar(userId);
}

async function updateAvatar(id, avatar) {
    let result = await userDao.updateAvatar(id, avatar);
    return result[0];
}

let exp = {
    register: register,
    login: login,
    logout: logout,
    updatePassword: updatePassword,
    updateUser: updateUser,
    queryAvatar: queryAvatar,
    updateAvatar: updateAvatar
};

module.exports = exp;