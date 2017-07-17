/**
 * Created by Administrator on 2017/7/17.
 */
'use strict';

const baseController = require('../base-controller');
const baseModel = require('../../model/base-model');

module.exports = {
    'GET /im/contacts':async (ctx, next) => {
        let queryString = ctx.request.querystring,
            sign = ctx.request.query.sign;
        if(!baseController.validateSign(queryString, sign)){
            baseModel.resultType = -1;
            baseModel.resultCode = -1;
            baseModel.detail = '请求违法';
            ctx.response.body = JSON.stringify(baseModel);
            return;
        }

        let token = ctx.request.query.token;
        if(!baseController.validateToken(token)){
            baseModel.resultType = -99;
            baseModel.resultCode = -99;
            baseModel.detail = '重新登录';
            baseModel.data = '重新登录';
            ctx.response.body = JSON.stringify(baseModel);
            return;
        }


    }
};