import axios from 'axios'
import { Message, MessageBox } from 'element-ui'
import {getToken} from "./auth";
import store from "../store/store";


// create an axios instance
const service = axios.create({
    baseURL: process.env.BASE_API, // api 的 base_url
    timeout: 0 // request timeout
})

// 请求前拦截
service.interceptors.request.use(config => {
    if (config.type === 'demo') {
        // config.baseURL = Vue.prototype.demoUrl
        config.baseURL = 'http://localhost:8080'
    } else {
        // config.baseURL = Vue.prototype.myUrl
        config.baseURL = 'http://localhost:8080'
    }
    if (store.getters.token) {
        config.headers['Authorization'] = getToken() // 让每个请求携带token-- ['X-Token']为自定义key 请根据实际情况自行修改
    }
    return config
}, error => {
    // Do something with request error
    // console.log(error) // for debug
    Promise.reject(error)
})

// 去请求后拦截
service.interceptors.response.use(
    response => {
        const res = response.data
        if (res.status === 0) {
            Message({
                message: res.message,
                type: 'error',
                duration: 5 * 1000
            })
            if (res.status === 1001) {
                MessageBox.confirm('你已被登出，可以取消继续留在该页面，或者重新登录', '确定登出', {
                    confirmButtonText: '重新登录',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    store.dispatch('FedLogOut').then(() => {
                        location.reload() // 为了重新实例化vue-router对象 避免bug
                    })
                })
            }
            return response.data
        } else {
            return response.data
        }
    },
    error => {
        // console.log('err' + error) // for debug
        Message({
            message: error.message,
            type: 'error',
            duration: 5 * 1000
        })
        return Promise.reject(error)
    })

export default service
