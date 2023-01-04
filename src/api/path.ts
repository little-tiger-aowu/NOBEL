import request from '../utils/request.js'

// 授权登录
export function userLogin(data:any) {
    return request({
        Accept: 'json',
        url: '/authorization/login',
        method: 'POST',
        data
    })
}

// 用户填写表单
export function userFrom(data:any) {
    return request({
        Accept: 'json',
        url: '/the-infor/addForm',
        method: 'POST',
        data
    })
}

// 获取七牛云token
export function getToken() {
    return request({
        url: '/common/upload_token',
        method: 'GET'
    })
}

// 上传七牛云
export function uploadQiNiu(data:any) {
    return request({
        url: 'https://up-z2.qiniup.com/synco-anniversaryh5',
        method: 'POST',
        data
    })
}


export function getAllList(params:any){
    return request({
        url:'/the-infor/getInforList',
        method:"GET",
        params
    })
}


// 点赞
export function cliLike(data:any){
    return request({
        Accept:'json',
        url:'/vote-history/putGive',
        method:"POST",
        data
    })
}
