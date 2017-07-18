/**
 * Created by Administrator on 2017/7/17.
 */
'use strict';

const baseController = require('../base-controller');
const baseModel = require('../../model/base-model');
const imService = require('../../service/im/im-service');

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

        let id = ctx.request.query.id;
        let contactsArray = imService.queryContacts(id);
        baseModel.resultType = 0;
        baseModel.resultCode = 0;
        baseModel.detail = '请求成功';
        baseModel.data = contactsArray;
        ctx.response.body = JSON.stringify(baseModel);
    },

    'GET /im/contactsDetail':async (ctx, next) => {
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

        let userId = ctx.request.query.user_id,
            friendId = ctx.request.query.friend_id;
        let contactsModel = await imService.queryContactsDetail(userId, friendId);
        baseModel.resultType = 0;
        baseModel.resultCode = 0;
        baseModel.detail = '请求成功';
        baseModel.data = contactsModel;
        ctx.response.body = JSON.stringify(baseModel);
    },

    'POST /im/modifyRemark':async (ctx, next) => {
        let queryString = baseController.parseBody(ctx.request.body),
            sign = ctx.request.body.sign;
        if(!baseController.validateSign(queryString, sign)){
            baseModel.resultType = -1;
            baseModel.resultCode = -1;
            baseModel.detail = '请求违法';
            ctx.response.body = JSON.stringify(baseModel);
            return;
        }
        let token = ctx.request.body.token;
        if(!baseController.validateToken(token)){
            baseModel.resultType = -99;
            baseModel.resultCode = -99;
            baseModel.detail = '重新登录';
            baseModel.data = '重新登录';
            ctx.response.body = JSON.stringify(baseModel);
            return;
        }

        let userId = ctx.request.body.user_id,
            friendId = ctx.request.body.friend_id,
            remark = ctx.request.body.remark;
        let result = await imService.updateRemark(userId, friendId, remark);
        if(!result){
            baseModel.resultType = -1;
            baseModel.resultCode = -1;
            baseModel.detail = '没有此用户';
        }else {
            baseModel.resultType = 0;
            baseModel.resultCode = 0;
            baseModel.detail = '修改备注成功';
            baseModel.data = '修改备注成功';
        }
        ctx.response.body = JSON.stringify(baseModel);
    }
};