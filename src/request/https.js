// 引入fetch
import fetch from './index'

// 封装get请求
export function get({url,params}) {
    return new Promise( (resolve,reject) => {
        fetch.request({url,method:"Get",params}).then( (res) => {
            resolve(res.data)
        }).catch( (err) => {
            reject(err.data)
        })
    })
}

// 封装post请求
export function post({url,params}) {
    return new Promise( (resolve,reject) => {
        //                               解析成多个形参:params:{xx,xx,xx}
        fetch.request({url,method:"POST",data:{...params}}).then( (res) => {
            // 成功时的回调
            resolve(res.data)
        }).catch( (err) => {
            // 失败时的回调
            reject(err.data)
        })
    })
}