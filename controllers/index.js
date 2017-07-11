/**
 * Created by Administrator on 2017/7/11.
 */
module.exports = {
    'GET /':async (ctx, next) => {
        ctx.render('index.html', {
            title: 'Welcome'
        });
    }
};