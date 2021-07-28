// 配置代理服务器，解决跨域问题
module.exports = {
    devServer:{
        open:true,
        host:'localhost',
        port:8080,
        proxy:{
            '/api':{
                target:'http://www.chst.vip', // 沧海桑田
                // target:'https://www.yuanmengsx.com', // 圆梦升学
                ws:true,
                changeOrigin:true,
                pathRewrite:{
                    '^/api':''
                }
            }
        }


    }
}