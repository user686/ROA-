import request from "../request";

export function handleGetOrder(){
    return new Promise(resolve=>{
        request({
            url: '/findorder'
        }).then(res=>{
            resolve(res.data)
        })
        
    })
}
export function handleCreateOrder(data){
    return new Promise(resolve=>{
        request({
            url: '/createorder',
            method: 'post',
            data: data
        }).then(res=>{
            resolve(res.data)
        })
        
    })
}
export function handleStockInquiry(data){
    return new Promise(resolve=>{
        request({
            url: '/stockinquiry',
            method: 'post',
            data: data
        }).then(res=>{
            resolve(res.data)
        })
        
    })
}
export function handleGetOrderConfig(data){
    return new Promise(resolve=>{
        request({
            url: '/order/getConfig?type='+data,
            method: 'get'
        }).then(res=>{
            resolve(res.data)
        })
        
    })
}