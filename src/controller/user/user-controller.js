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
        await userService.login('15606958888', '123');
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
        let result = await userService.register(username, password, verifyCode);
        switch (result){
            case 0:
                baseModel.resultType = -1;
                baseModel.resultCode = -1;
                baseModel.detail = '注册失败，请稍后再试';
                ctx.response.body = JSON.stringify(baseModel);
                break;
            case 1:
                baseModel.resultType = 0;
                baseModel.resultCode = 0;
                baseModel.detail = '注册成功';
                baseModel.data = '注册成功';
                ctx.response.body = JSON.stringify(baseModel);
                break;
            case 2:
                baseModel.resultType = -1;
                baseModel.resultCode = -1;
                baseModel.detail = '该用户已注册过';
                ctx.response.body = JSON.stringify(baseModel);
                break;
            case 3:
                baseModel.resultType = 0;
                baseModel.resultCode = 0;
                baseModel.detail = '该用户注册过且密码相同，自动为您登录';
                baseModel.data = '该用户注册过且密码相同，自动为您登录';
                ctx.response.body = JSON.stringify(baseModel);
                break;
        }
    },

    'POST /user/login':async (ctx, next) => {
        let queryString = baseController.parseBody(ctx.request.body),
            sign = ctx.request.body.sign;
        if(!baseController.validateSign(queryString, sign)){
            baseModel.resultType = -1;
            baseModel.resultCode = -1;
            baseModel.detail = '请求违法';
            ctx.response.body = JSON.stringify(baseModel);
        }

        let username = ctx.request.body.username,
            password = ctx.request.body.password;

    },
};