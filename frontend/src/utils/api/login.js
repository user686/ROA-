import request from "../request";

export function handleTest(){
    return new Promise(resolve=>{
        request({
            url: '/test'
        }).then(res=>{
            resolve(res)
        })
        
    })
}
export function handleGetCode(option){
    return new Promise(resolve=>{
        request({
            url: '/getEmailCode',
            method: 'post',
            data: option
        }).then(res=>{
            resolve(res.data)
        })
        
    })
}
export function handleGetPhoneCode(option){
    return new Promise(resolve=>{
        request({
            url: '/getvertify',
            method: 'post',
            data: option
        }).then(res=>{
            resolve(res.data)
        })
        
    })
}
export function handleRegister(option){
    return new Promise(resolve=>{
        request({
            url: '/register',
            method: 'post',
            data: option
        }).then(res=>{
            resolve(res)
        })
        
    })
}







