import request from "../request";

export function handleGet(id){
    return new Promise(resolve=>{
        request({
            method: 'get',
            url: '/argument?id='+id
        }).then(res=>{
            resolve(res.data)
        })

    })
}
export function handleGetList(){
    return new Promise(resolve=>{
        request({
            method: 'get',
            url: '/argument/list'
        }).then(res=>{
            resolve(res.data)
        })
    })
}
export function handleCreate(option){
    return new Promise(resolve=>{
        request({
            method: 'post',
            url: '/argument',
            data: option
        }).then(res=>{
            resolve(res.data)
        })
    })
}
export function handleUpdate(id,option){
    return new Promise(resolve=>{
        request({
            method: 'put',
            url: '/argument/'+id,
            data: option
        }).then(res=>{
            resolve(res.data)
        })
    })
}