const path = require('path');
const mime = require('mime');
const fs = require('mz/fs');

//将路由映射到指定目录的静态文件
function staticFiles(url, dir){
    return async (ctx, next) => {
        let rpath = ctx.request.path;
        console.log(rpath)

        //判断是否以指定的url开头
        if(rpath.startsWith(url)){
            //获取文件完整路径
            let fp = path.join(dir, rpath.substring(url.length));
            //判断指定文件是否存在
            if(await fs.exists(fp)){
                //查找文件的mime
                ctx.response.type = mime.lookup(rpath);
                //读取文件的内容并赋值给body
                ctx.response.body = await fs.readFile(fp);
            }else{
                // 文件不存在:
                ctx.response.status = 404;
            }
        }else{
            // 不是指定前缀的URL，继续处理下一个middleware:
            await next();
        }
    }
}

module.exports = staticFiles;