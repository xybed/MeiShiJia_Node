/**
 * Created by Administrator on 2017/7/18.
 */
'use strict';

const db = require('../../db');
const Food = require('../food/dbFood');
const Category = require('../food/dbCategory');

const FoodCategory = db.defineModel('food_category', {});

Food.belongsToMany(Category, {through: FoodCategory, foreignKey:'food_id'});
Category.belongsToMany(Food, {through: FoodCategory, foreignKey:'category_id'});

module.exports = FoodCategory;