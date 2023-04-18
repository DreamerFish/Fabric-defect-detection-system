module.exports = {
    devServer: {
      proxy: {  //配置跨域
        '/api': {
          target: 'http://110.42.174.240:8055',  //这里后台的地址模拟的;应该填写你们真实的后台接口
          changOrigin: true,  //表示是否改变原域名
          ws: true,//表示WebSocket协议
          pathRewrite: {
            /* 重写路径，当我们在浏览器中看到请求的地址为：/api/…… 时
              实际上访问的地址是：http://"你请求的后台地址.com/……",因为重写了 /api
             */
            '^/api': ''
          }
        },
      }
    },
  }
  