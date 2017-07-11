/**
 * Created by Administrator on 2017/6/27.
 */
'use strict';

//我们导入的koa是一个class，因此用大写的Koa
const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const controller = require('./router2controller');
const templating = require('./templating');

const app = new Koa();
// const isProduction = process.env.NODE_ENV === 'production';

app.use(async (ctx, next) => {
    console.log(`Process ${ctx.request.method} ${ctx.request.url}...`);
    var
        start = new Date().getTime(),
        execTime;
    await next();
    execTime = new Date().getTime() - start;
    ctx.response.set('X-Response-Time', `${execTime}ms`);
});

let staticFiles = require('./static-files');
app.use(staticFiles('/static/', __dirname + '/static'));

app.use(bodyParser());

app.use(templating('views', {
    noCache: true,
    watch: true
}));

app.use(controller());

app.listen(8081);
console.log('app started at port 8081...');