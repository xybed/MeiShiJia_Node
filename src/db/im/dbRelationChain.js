/**
 * Created by Administrator on 2017/7/18.
 */
'use strict';

const db = require('../../db');
const User = require('../user/dbUser');

const RelationChain = db.defineModel('relation_chain', {
    remark: db.STRING(255),
    sort_letter: db.STRING
});

User.belongsToMany(User, {as:'friend', through:RelationChain});
// Friend.belongsToMany(User, {as:'friend', through:RelationChain, foreignKey:'friend_id'});

module.exports = RelationChain;