import request from "../request";

export function handleGetProduct(option){
    return new Promise(resolve=>{
        request({
            method: 'post',
            url: '/getproduct',
            data: option
        }).then(res=>{
            resolve(res.data)
        })

    })
}

export function handleAdminGetProduct(option){
    return new Promise(resolve=>{
        request({
            method: 'post',
            url: '/getproductbyadmin',
            data: option
        }).then(res=>{
            resolve(res.data)
        })

    })
}

export function handleAddProduct(data){
    return new Promise(resolve=>{
        request({
            url: '/addproduct',
            method: 'post',
            data: data
        }).then(res=>{
            resolve(res.data)
        })

    })
}

export function handleUpdataProduct(data){
    return new Promise(resolve=>{
        request({
            url: '/updataproduct',
            method: 'post',
            data: data
        }).then(res=>{
            resolve(res.data)
        })
    })
}

export function handleGetCtxList(){
    return new Promise(resolve=>{
        request({
            url: '/getctxlist',
            method: 'get'
        }).then(res=>{
            resolve(res.data)
        })
    })
}


export function handleDeleteProduct(data){
    return new Promise(resolve=>{
        request({
            url: '/product/'+data,
            method: 'delete'
        }).then(res=>{
            resolve(res.data)
        })
    })
}
