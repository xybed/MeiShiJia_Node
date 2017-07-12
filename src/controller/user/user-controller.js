/**
 * Created by Administrator on 2017/7/12.
 */
'use strict'

const userService = require('../../service/user/user-service');

module.exports = {
    'GET /user/login':async (ctx, next) => {
        let username = ctx.request.query.username,
            verify_code = ctx.request.query.verify_code;
        let users = await userService.login(username, verify_code);
        for(let user of users){
            console.log(JSON.stringify(user));
        }
    }
};