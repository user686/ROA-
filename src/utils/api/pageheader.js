import request from "../request";

export function handleAddFeedback(option){
    return new Promise(resolve=>{
        request({
            method: 'post',
            url: '/feedback',
            data: option
        }).then(res=>{
            resolve(res.data)
        })

    })
}
