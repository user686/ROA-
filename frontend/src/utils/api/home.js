import request from "../request";

export function saveUserIp(){
    return new Promise(resolve=>{
        request({
            method: 'get',
            url: '/savedata'
        }).then(res=>{
            resolve(res.data)
        })

    })
}
export function handleGetCtxlist(option){
    return new Promise(resolve=>{
        request({
            method: 'get',
            url: `/getctxlist?name=${option?option:''}`
        }).then(res=>{
            resolve(res.data)
        })

    })
}
export function handleGetCtx(id){
    return new Promise(resolve=>{
        request({
            method: 'get',
            url: '/getctx?id='+id
        }).then(res=>{
            resolve(res.data)
        })

    })
}
