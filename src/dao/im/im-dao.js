/**
 * Created by Administrator on 2017/7/18.
 */
'use strict';

const RelationChain = require('../../db/im/dbRelationChain');
const User = require('../../db/user/dbUser');
const Friend = require('../../db/user/dbUser');
const FoodCategory = require('../../db/food/dbFoodCategory');
const Food = require('../../db/food/dbFood');
const Category = require('../../db/food/dbCategory');
const db = require('../../db');

async function queryContacts() {
    // let result = await Food.findOne({
    //     where: {
    //         id: 1
    //     },
    //     include: {
    //         model: Category
    //     },
    //     attributes:['food_url', 'food_name', 'food_image']
    // });
    // console.log(JSON.stringify(result));
    // let result = await User.findAll({
    //     where: {
    //         user_id: 1
    //     },
    //     attributes: ['avatar', 'principal_id'],
    //     include: {
    //         model: User,
    //         through: {
    //             attributes: ['friend_id', 'remark', 'sort_letter']
    //         }
    //     }
    // });
    // console.log(JSON.stringify(result));
    let result = await db.sequelize.query('SELECT friend_id,remark,avatar,sort_letter,principal_id FROM user,relation_chain WHERE user_id=$1 AND id=friend_id',
        {bind:['1'], type:db.sequelize.QueryTypes.SELECT});
    console.log(JSON.stringify(result));
}

let exp = {
    queryContacts: queryContacts
};

module.exports = exp;