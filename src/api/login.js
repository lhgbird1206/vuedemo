import request from "../utils/request";

export function loginByUsername(mobile, password) {
    const data = {
        username: mobile,
        password
    }
    return request({
        url: '/api/authenticate',
        method: 'post',
        data
    })
}

export function logout() {
    return request({
        url: 'rest/auth/logout',
        method: 'post'
    })
}

export function getUserInfo() {
    return request({
        url: 'rest/auth/getUserInfo',
        method: 'post'
    })
}

