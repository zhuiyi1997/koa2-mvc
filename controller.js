const fs = require('fs');
function addControllers(router, dir){
    //扫描得到所有controller目录下面的.js文件
    var files = fs.readdirSync(__dirname + '/controllers');
    //过滤掉所有不是.js的文件
    var js_files = files.filter((f) => {
        return f.endsWith('.js');
    });

    //将路由和方法匹配
    for(var f of js_files){
        let mapping = require(__dirname + '/controllers/' + f);
        //调用匹配函数
        addMapping(router,mapping)
    }
}

//路由匹配合并函数
function addMapping(router,mapping){
    for(var url in mapping){
        //是get请求
        if(url.startsWith('GET ')){
            var path = url.substring(4);
            //注册路由
            router.get(path,mapping[url]);
        }else if(url.startsWith('POST ')){
            var path = url.substring(5);
            router.post(path,mapping[url]);
        }else{
            console.log(`invalid URL: ${url}`);
        }
    }
}

module.exports = function (dir) {
    let
        controllers_dir = dir || 'controllers', // 如果不传参数，扫描目录默认为'controllers'
        router = require('koa-router')();
    addControllers(router, controllers_dir);
    return router.routes();
};