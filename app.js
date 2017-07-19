/**
 * Created by Administrator on 2017/6/27.
 */
'use strict';

//我们导入的koa是一个class，因此用大写的Koa
const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const koaBody = require('koa-body');
const controller = require('./src/router2controller');
const templating = require('./templating');
const staticFiles = require('./static-files');

const app = new Koa();

app.use(async (ctx, next) => {
    console.log(`Process ${ctx.request.method} ${ctx.request.url}...`);
    var
        start = new Date().getTime(),
        execTime;
    await next();
    execTime = new Date().getTime() - start;
    ctx.response.set('X-Response-Time', `${execTime}ms`);
});

app.use(staticFiles('/meishijia', __dirname + '/static'));

app.use(koaBody({ multipart: true }));
app.use(bodyParser());

app.use(templating('views', {
    noCache: true,
    watch: true
}));

app.use(controller());

app.listen(3000);
console.log('app started at port 3000...');