/**
 * Created by Administrator on 2017/7/14.
 */
'use strict';

function getNowDate() {
    let now = new Date();
    let month = now.getMonth() + 1;
    let date = now.getDate();
    let hour = now.getHours();
    let minute = now.getMinutes();
    let second = now.getSeconds();
    if(month >= 1 && month <= 9){
        month = '0' + month;
    }
    if(date >= 1 && date <= 9){
        date = '0' + date;
    }
    if(hour >= 0 && hour <= 9){
        hour = '0' + hour;
    }
    if(minute >= 0 && minute <= 9){
        minute = '0' + minute;
    }
    if(second >= 0 && second <= 9){
        second = '0' + second;
    }
    return now.getFullYear() + '-' + month + '-' + date
        + ' ' +
        hour + ':' + minute + ':' + second;
}

let exp = {
    getNowDate: getNowDate
};

module.exports = exp;