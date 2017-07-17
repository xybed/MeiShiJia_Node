/**
 * Created by Administrator on 2017/7/12.
 */
'use strict';

const baseController = require('../base-controller');
const userService = require('../../service/user/user-service');
const baseModel = require('../../model/base-model');
const fs = require('fs');
const CONSTANTS = require('../../constants/constants');
const crypto = require('crypto');
const md5 = crypto.createHash('md5');

module.exports = {
    'GET /': async (ctx, next) => {
        // ctx.render('index.html', {
        //     title: 'Welcome'
        // });
        await userService.updatePassword('15606958888', '123');
    },

    'POST /user/register':async (ctx, next) => {
        let queryString = baseController.parseBody(ctx.request.body),
            sign = ctx.request.body.sign;
        if(!baseController.validateSign(queryString, sign)){
            baseModel.resultType = -1;
            baseModel.resultCode = -1;
            baseModel.detail = '请求违法';
            ctx.response.body = JSON.stringify(baseModel);
            return;
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
            return;
        }

        let username = ctx.request.body.username,
            password = ctx.request.body.password;
        let userModel = await userService.login(username, password);
        if(userModel){
            baseModel.resultType = 0;
            baseModel.resultCode = 0;
            baseModel.detail = '登录成功';
            baseModel.data = userModel;
        }else {
            baseModel.resultType = -1;
            baseModel.resultCode = -1;
            baseModel.detail = '用户名或密码不正确';
        }
        ctx.response.body = JSON.stringify(baseModel);
    },

    'POST /user/logout':async (ctx, next) => {
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
        await userService.logout(token);
        baseModel.resultType = 0;
        baseModel.resultCode = 0;
        baseModel.detail = '退出登录成功';
        ctx.response.body = JSON.stringify(baseModel);
    },

    'POST /user/modifyPwd':async (ctx, next) => {
        let queryString = baseController.parseBody(ctx.request.body),
            sign = ctx.request.body.sign;
        if(!baseController.validateSign(queryString, sign)){
            baseModel.resultType = -1;
            baseModel.resultCode = -1;
            baseModel.detail = '请求违法';
            ctx.response.body = JSON.stringify(baseModel);
            return;
        }

        let username = ctx.request.body.username,
            password = ctx.request.body.password;
        if(!(username && password)){
            baseModel.resultType = -1;
            baseModel.resultCode = -1;
            baseModel.detail = '请求违法';
            return;
        }

        let result = userService.updatePassword(username, password);
        if(!result){
            baseModel.resultType = -1;
            baseModel.resultCode = -1;
            baseModel.detail = '没有此用户';
        }else {
            baseModel.resultType = 0;
            baseModel.resultCode = 0;
            baseModel.detail = '修改密码成功';
            baseModel.data = '修改密码成功';
        }
        ctx.response.body = JSON.stringify(baseModel);
    },

    'POST /user/modifyUserInfo':async (ctx, next) => {
        let queryString = baseController.parseBody(ctx.request.body),
            sign = ctx.request.body.sign;
        if(!baseController.validateSign(queryString, sign)){
            baseModel.resultType = -1;
            baseModel.resultCode = -1;
            baseModel.detail = '请求违法';
            ctx.response.body = JSON.stringify(baseModel);
            return;
        }

        let user = {};
        user.id = ctx.request.body.id;
        user.nickname = ctx.request.body.nickname;
        user.realName = ctx.request.body.real_name;
        user.sex = ctx.request.body.sex;
        user.birthday = ctx.request.body.birthday;
        user.email = ctx.request.body.email;
        user.province = ctx.request.body.province;
        user.city = ctx.request.body.city;
        user.signature = ctx.request.body.signature;
        let result = await userService.updateUser(user);
        if(!result){
            baseModel.resultType = -1;
            baseModel.resultCode = -1;
            baseModel.detail = '没有此用户';
        }else {
            baseModel.resultType = 0;
            baseModel.resultCode = 0;
            baseModel.detail = '修改信息成功';
            baseModel.data = '修改信息成功';
        }
        ctx.response.body = JSON.stringify(baseModel);
    },

    'POST /user/modifyAvatar':async (ctx, next) => {
        let queryString = baseController.parseBody(ctx.request.body),
            sign = ctx.request.body.sign;
        if(!baseController.validateSign(queryString, sign)){
            baseModel.resultType = -1;
            baseModel.resultCode = -1;
            baseModel.detail = '请求违法';
            ctx.response.body = JSON.stringify(baseModel);
            return;
        }

        let userId = ctx.request.body.id,
            //应该是koa-body会把图片自动缓存到C:\\Users\\ADMINI~1\\AppData\\Local\\Temp\\目录下，copy好后，手动删除一下
            file = ctx.request.body.files.img_file;
        let dbAvatar = await userService.queryAvatar(userId);
        if(!dbAvatar.endsWith('icon_default_avatar.png')){
            //异步删除文件
            fs.unlink(CONSTANTS.baseImgPath + dbAvatar);
        }
        md5.update(userId + Date.now());
        let avatar = md5.digest('hex');
        //存图片
        let reader = fs.createReadStream(file.path);
        let writer = fs.createWriteStream(CONSTANTS.baseImgPath + CONSTANTS.baseImgAvatarPath + avatar + '.png');
        reader.pipe(writer);
        fs.unlink(file.path);
        let result = userService.updateAvatar(userId, CONSTANTS.baseImgAvatarPath + avatar + '.png');
        if(!result){
            baseModel.resultType = -1;
            baseModel.resultCode = -1;
            baseModel.detail = '修改头像失败';
        }else {
            baseModel.resultType = 0;
            baseModel.resultCode = 0;
            baseModel.detail = '修改头像成功';
            baseModel.data = CONSTANTS.baseImgUrl + CONSTANTS.baseImgAvatarPath + avatar + '.png';
        }
        ctx.response.body = JSON.stringify(baseModel);
    }
};