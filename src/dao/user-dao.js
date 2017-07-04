/**
 * Created by Administrator on 2017/6/27.
 */
'use strict';

const Sequelize = require('sequelize');
const config = require('./../../resources/config.js');

var sequelize = new Sequelize(config.database, config.username, config.password, {
    host: config.host,
    dialect:'mysql',
    pool:{
        max:5,
        min:0,
        idle:30000
    }
});

var User = sequelize.define('user', {
    id:{
        type:Sequelize.INTEGER,
        primaryKey:true
    },
    username:Sequelize.STRING(255),
    password:Sequelize.STRING(255)
},{
    timestamps:false,
    tableName:'user'
});

(async () => {
    var user = await User.findAll({
        where:{
            id:1
        }
    });
    console.log(`find ${user.length} user`);
    for(let u of user){
        console.log(JSON.stringify(u));
    }
})();