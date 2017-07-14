/**
 * Created by Administrator on 2017/7/13.
 */
//用于测试js一些方法的文件
'use strict';

const Sequelize = require('sequelize');
const User = require('./src/db/user/dbUser');

function test1() {
    var str = 'ver=1&sign=72df80bf7a29839332eb6bc58f657fb0&type=2&platform=android&token=f895dbe12d7c65804b5704fed9cdcf02';
    var strArr = str.split('&');
    console.log(strArr.length);
    for(let s in strArr){
        console.log(strArr[s]);
    }
    console.log(strArr.indexOf('username=15606959485'));
    strArr.splice(strArr.indexOf('username=15606959485'), 1);
    strArr.sort();
    for(let s of strArr){
        console.log(s);
    }
}

function test2() {
    console.log(Date.now());
    console.log(new Date().getTime());
}

test2();
