var login = async (ctx, next) => {
    const start = new Date(); // 当前时间
ctx.type = "text/html";
    const time = new Date().toLocaleString();
    const data = env.render('index.html',{time:time})
    ctx.body = data
};

var dologin = async (ctx, next) => {
    const data = ctx.request.body;
ctx.body = data
};

module.exports = {
    'GET /login':login,
    'POST /dologin':dologin
}