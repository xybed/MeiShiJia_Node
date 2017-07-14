/**
 * Created by Administrator on 2017/6/27.
 */
'use strict';

const Sequelize = require('sequelize');
const db = require('../../db');
const User = require('../../db/user/dbUser');
const UserToken = require('../../db/user/dbUserToken');
const dateUtil = require('../../lib/utils/date-util');

async function verifyRegister(username) {
    return await User.findOne({
        attributes: [[Sequelize.fn('COUNT', Sequelize.col('*')), 'isRegister']],
        where: {username: username}
    });
}

async function verifyPassword(username, password) {
    return await User.findOne({
        attributes: [[Sequelize.fn('COUNT'), Sequelize.col('*'), 'passwordIsCorrect']],
        where: {
            username: username,
            password: password
        }
    });
}

/**
 * 这里要先插入用户注册数据，再根据id生成pid，所以用到了事务
 * 经过对sequelize的api研究，还有一些代码实验，最终得出下面的代码
 * 当发生异常的时候，sequelize会自动回滚事务
 * @param username
 * @param password
 * @param verifyCode
 * @returns {Promise.<number>}
 */
async function register(username, password, verifyCode) {
    let nowDate = dateUtil.getNowDate();
    try{
        await db.sequelize.transaction(function (t){
            return User.create({
                username: username,
                password: password,
                verify_code: verifyCode,
                register_date: nowDate,
                avatar: 'avatar/icon_default_avatar.png',
                nickname: username,
                mobile_phone: username,
                sex: 0
            }, {transaction: t}).then(function (user) {
                return User.update({principal_id: user.id + 1000},
                    {
                        where: {
                            username: user.username
                        },
                        transaction: t
                    });
            })
        });
        return 1;
    }catch(err){
        return 0;
    }
}

/**
 * 如果查询不到数据，会返回null
 * @param username
 * @param password
 * @returns {Promise.<*>}
 */
async function login(username, password) {
    return await User.findOne({
        where: {
            username: username,
            password: password
        }
    });
}

async function insertOrUpdateToken(username, token, deadline) {
    return await UserToken.upsert({
        username: username,
        token: token,
        deadline: deadline
    }, {
        where: {
            username: username
        }
    });
}

let exp = {
    verifyRegister: verifyRegister,
    verifyPassword: verifyPassword,
    register: register,
    login: login,
    insertOrUpdateToken: insertOrUpdateToken
};

module.exports = exp;