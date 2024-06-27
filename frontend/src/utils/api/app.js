import request from "../request";

export function hanldVertifyBlackuser(){
    return new Promise(resolve=>{
        request({
            method: 'get',
            url: '/vertifyBlackuser'
        }).then(res=>{
            resolve(res.data)
        })
    })
}