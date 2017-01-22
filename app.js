const Koa = require('koa');
const  app = new Koa();

//路由处理模块
const router = require('koa-router')();
//json,post数据处理模块
const bodyParser = require('koa-bodyparser');

//加载自定义包
const templating = require('./templating')
const controller = require('./controller')

//判断环境
const isProduction = process.env.NODE_ENV === 'production';

//记录url以及页面执行时间
app.use(async (ctx, next) => {
    console.log(`Process ${ctx.request.method} ${ctx.request.url}...`);
var
    start = new Date().getTime(),
    execTime;
await next();
execTime = new Date().getTime() - start;
ctx.response.set('X-Response-Time', `${execTime}ms`);
});

//开发环境加载js,css,image等静态文件
if(! isProduction){
    let staticFiles = require('./static-files');
    app.use(staticFiles('/static/', __dirname + '/static'));
}

//解析POST请求：
app.use(bodyParser());

//给ctx加入render方法
app.use(templating('views', {
    noCache: !isProduction,
    watch: !isProduction
}));

//处理路由
app.use(controller());

app.listen(3000)