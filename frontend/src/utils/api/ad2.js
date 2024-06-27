import request from "../request";

export function createorderspecial(option){
    return new Promise(resolve=>{
        request({
            method: 'post',
            url: '/createorder/special',
            data: option
        }).then(res=>{
            resolve(res.data)
        })
    })
}