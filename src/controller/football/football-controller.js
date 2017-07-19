/**
 * Created by Administrator on 2017/7/19.
 */
'use strict';

const baseController = require('../base-controller');
const baseModel = require('../../model/base-model');
const footballService = require('../../service/football/football-service');

module.exports = {
    'GET /football/ranking':async (ctx, next) => {
        let queryString = ctx.request.querystring,
            sign = ctx.request.query.sign;
        if(!baseController.validateSign(queryString, sign)){
            baseModel.resultType = -1;
            baseModel.resultCode = -1;
            baseModel.detail = '请求违法';
            ctx.response.body = JSON.stringify(baseModel);
            return;
        }

        let type = ctx.request.query.type;
        if(type<1 || type>6){
            baseModel.resultType = -1;
            baseModel.resultCode = -1;
            baseModel.detail = '请求违法';
            ctx.response.body = JSON.stringify(baseModel);
            return;
        }
        let rankingArray = await footballService.getRanking(type);
        baseModel.resultType = 0;
        baseModel.resultCode = 0;
        baseModel.detail = '请求成功';
        baseModel.data = rankingArray;
        ctx.response.body = JSON.stringify(baseModel);
    }
};