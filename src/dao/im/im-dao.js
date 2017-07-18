/**
 * Created by Administrator on 2017/7/18.
 */
'use strict';

const db = require('../../db');

async function queryContacts(id) {
    /**
     * 注释的是多表关联查询的示例代码，第二段的user表自身关联是不对的，还没搞懂
     */
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
    return await db.sequelize.query(
        `SELECT friend_id,remark,avatar,sort_letter,principal_id 
        FROM user,relation_chain 
        WHERE user_id=$1 AND id=friend_id`,
        {bind:[id], type:db.sequelize.QueryTypes.SELECT});
}

async function queryContactsDetail(userId, friendId) {
    return await db.sequelize.query(
        `SELECT avatar,remark,sex,username,nickname,province,city,signature,principal_id 
        FROM user,relation_chain 
        WHERE friend_id=$2 AND user_id=$1 AND id=$2`,
        {bind:[userId, friendId], type:db.sequelize.QueryTypes.SELECT});
}

async function updateRemark(userId, friendId, remark) {
    return await db.sequelize.query(
        `UPDATE relation_chain 
        SET remark=$3
        WHERE user_id=$1 AND friend_id=$2`,
        {bind:[userId,friendId,remark], type:db.sequelize.QueryTypes.UPDATE});
}

let exp = {
    queryContacts: queryContacts,
    queryContactsDetail: queryContactsDetail,
    updateRemark: updateRemark
};

module.exports = exp;