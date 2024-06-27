import axios from "axios";

// let baseUrl = `http://localhost:7001`
let baseUrl = `http://47.115.205.88:7001`
// let baseUrl = `http://www.gaozhiwang.top:7001`

const whiteList = [
    '/register',
    '/getEmailCode',
    '/getctx',
    '/getctxlist',
    '/test',
]


export default function(option){
    return new Promise(resolve=>{
        if(!whiteList.includes(option.url)){
            option.tooltoken = localStorage.getItem('tooltoken')
            option.headers =  Object.assign({}, {Authority: option.tooltoken}, option.headers)
        }
        option.url = baseUrl+option.url

        axios(option).then(res=>{
            resolve(res)
        })
    })
}