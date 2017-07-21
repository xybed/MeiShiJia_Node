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
    let usersig = 'eJxNzk1Pg0AQgOH-whWjs7sFwVsFPzBIodAYeiEUtnW0LrhsKY3xv7sSjL0*72RmvowsTC-LqmoOQhXq1HLjxgDjYmSsuVC4RS417vETJy-bFuuiVAWT9dl4V78XY9JGZgDAbEatKfKhRcmLcqvGbYS6tp6YYs9lh43QToHYBAiB-6jw4-cpYgHYlLqO83cOd5qf73IvSHwnKWWqvM3tVZofcxGbvnD3Lw7zaDIk-k72qfV0nJnm2p8Hr-NYNPf5khw2KV13JoQiWy5WXfhQ9dmbhdHiMa6jJhjYdaSM7x8swVZh';
    imApi(usersig, '1003');
}


test2();

