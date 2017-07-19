/**
 * Created by Administrator on 2017/7/13.
 */
'use strict';

const crypto = require('crypto');
const tokenService = require('../service/user/token-service');
const TOKEN_KEY = 'MeiShiJia';

/**
 * 自己封装的解析body中数据的方法
 * 目的是把body中形式为json的数据，转为get中的字符串形式的数据
 * 好为验证sign做准备
 * （没有了解有没有其他node模块有类似的处理，暂时自己封装方法）
 * （注意JSON.parse中的第一个参数要为json字符串，body为object，这里要做个转换）
 * @param body post请求中的body
 * @returns {string} 返回组合成的queryString
 */
function parseBody(body) {
    let queryString = '';
    JSON.parse(JSON.stringify(body), function (key, value) {
        if(key){
            queryString = queryString + key + '=' + value + '&';
        }
    });
    return queryString.substring(0, queryString.length - 1);
}

/**
 * 验证请求的签名规则是否正确
 * @param queryString 请求的queryString
 * @param sign 请求的签名
 * @returns {boolean} 前端签名是否等于后端签名
 */
function validateSign(queryString, sign) {
    if(!sign)
        return false;
    if(!queryString)
        return false;
    let strArr = queryString.split('&');
    if(strArr.length > 0){
        for(let str of strArr){
            if(str.indexOf('=') < 0 || str.startsWith('sign=')){
                strArr.splice(strArr.indexOf(str), 1);
            }
        }
    }
    strArr.sort();
    let strBuilder = TOKEN_KEY;
    for(let i=0;i<strArr.length;i++){
        if(i === strArr.length - 1){
            strBuilder = strBuilder + strArr[i];
        }else {
            strBuilder = strBuilder + strArr[i] + '&';
        }
    }
    strBuilder = strBuilder + TOKEN_KEY;
    let md5 = crypto.createHash('md5');
    md5.update(strBuilder);
    return sign === md5.digest('hex');
}

async function validateToken(token) {
    let userToken = await tokenService.queryToken(token);
    return userToken && Date.now() <= userToken.deadline;
}

let exp = {
    parseBody: parseBody,
    validateSign: validateSign,
    validateToken: validateToken
};

module.exports = exp;