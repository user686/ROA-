import request from "../request";

export function handleGetUserInfo(){
    return new Promise(resolve=>{
        request({
            method: 'get',
            url: '/login'
        }).then(res=>{
            resolve(res.data)
        })

    })
}

export function handleAsyncInit(option){
    return new Promise(resolve=>{
        request({
            method: 'post',
            url: '/async/init',
            data: option
        }).then(res=>{
            resolve(res.data)
        })

    })
}

export function handleGetPayCodeList(){
    return new Promise(resolve=>{
        request({
            method: 'get',
            url: '/payqrcode/list'
        }).then(res=>{
            resolve(res.data)
        })

    })
}

export function handleCreatePayCode(data){
    return new Promise(resolve=>{
        request({
            method: 'post',
            url: '/payqrcode',
            data: data
        }).then(res=>{
            resolve(res.data)
        })

    })
}
