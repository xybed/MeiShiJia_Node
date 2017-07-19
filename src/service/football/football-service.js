/**
 * Created by Administrator on 2017/7/19.
 */
'use strict';

const footballDao = require('../../dao/football/football-dao');
const CONSTANTS = require('../../constants/constants');

async function getRanking(type) {
    let result = await footballDao.queryRanking(type);
    let rankingArray = [];
    for(let i=0;i<result.length;i++){
        result[i].logo = CONSTANTS.baseImgUrl + result[i].logo;
        rankingArray[i] = result[i];
    }
    return rankingArray;
}

let exp = {
    getRanking: getRanking
};

module.exports = exp;