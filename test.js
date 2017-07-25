/**
 * Created by Administrator on 2017/7/13.
 */
//用于测试js一些方法的文件
'use strict';

const Sequelize = require('sequelize');
const fs = require('fs');
const crypto = require('crypto');
const gensig = require('./src/lib/tencent/usersig');
const imApi = require('./src/api/im-rest-api');

function test1() {
    var str = 'ver=1&sign=72df80bf7a29839332eb6bc58f657fb0&type=2&platform=android&token=f895dbe12d7c65804b5704fed9cdcf02';
    var strArr = str.split('&');
    console.log(strArr.length);
    for(let s in strArr){
        console.log(strArr[s]);//s为key
    }
    console.log(strArr.indexOf('username=15606959485'));
    strArr.splice(strArr.indexOf('username=15606959485'), 1);
    strArr.sort();
    for(let s of strArr){
        console.log(s);//s为value
    }
}

function test2() {
    let str = '';
    if(str){
        console.log('true');
    }else {
        console.log('false');
    }
}


test2();

