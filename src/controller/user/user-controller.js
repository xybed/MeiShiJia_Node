/**
 * Created by Administrator on 2017/7/12.
 */
'use strict';

const baseController = require('../base-controller');
const userService = require('../../service/user/user-service');
const baseModel = require('../../model/base-model');

module.exports = {
    'GET /': async (ctx, next) => {
        // ctx.render('index.html', {
        //     title: 'Welcome'
        // });
        let instance = await userService.login('15606954708');
        let count = instance[0].get('count');
        console.log(count);
    },

    'POST /user/register':async (ctx, next) => {
        let queryString = baseController.parseBody(ctx.request.body),
            sign = ctx.request.body.sign;
        if(!baseController.validateSign(queryString, sign)){
            baseModel.resultType = -1;
            baseModel.resultCode = -1;
            baseModel.detail = '请求违法';
            ctx.response.body = JSON.stringify(baseModel);
        }

        let username = ctx.request.body.username,
            password = ctx.request.body.password,
            verifyCode = ctx.request.body.verify_code;
    },

    'GET /user/login':async (ctx, next) => {
        let username = ctx.request.query.username,
            verify_code = ctx.request.query.verify_code;
        let users = await userService.login(username, verify_code);
        for(let user of users){
            console.log(JSON.stringify(user));
        }
    },
};