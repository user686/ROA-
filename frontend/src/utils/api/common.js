import request from "../request";

export function upLoad(file){
    return new Promise(resolve=>{
        request({
            method: 'post',
            url: '/uploadqrimg',
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            data: file
        }).then(res=>{
            resolve(res.data)
        })

    })
}
