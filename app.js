/**
 * Created by Administrator on 2017/6/27.
 */
'use strict';

//我们导入的koa是一个class，因此用大写的Koa
const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
// 注意require('koa-router')返回的是函数:
const router = require('koa-router')();

const app = new Koa();

app.use(bodyParser());

router.post();

app.use(router.routes());
app.listen(8081);