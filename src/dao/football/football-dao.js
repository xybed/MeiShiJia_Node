/**
 * Created by Administrator on 2017/7/19.
 */
'use strict';

const db = require('../../db');

async function queryRanking(leagueId) {
    return await db.sequelize.query(
        `SELECT league_id,team_id,ranking,logo,name,plays,point,win,draw,lose,goal,conceded,goal_difference 
        FROM football_team,football_ranking 
        WHERE football_team.id=football_ranking.team_id AND league_id=$1 
        ORDER BY ranking`,
        {bind:[leagueId], type:db.sequelize.QueryTypes.SELECT});
}

let exp = {
    queryRanking: queryRanking
};

module.exports = exp;