import request from '@/utils/request'
import { localUsers } from "../mock/users"
import { Message } from 'element-ui'

export function login(data) {

    function dataHandler(resolve, resp) {
        switch (resp.err) {
            case 0:
                resolve(resp)
                break;

            case 1:
                Message({
                    message: "密码错误",
                    type: 'error',
                    duration: 5 * 1000
                })
                break;

            case 2:
                Message({
                    message: "用户不存在",
                    duration: 5 * 1000
                })
                break;

            default:
                break;
        }
    }

    return new Promise((resolve, reject) => {
        request({
            url: '/vue-element-admin/user/login',
            method: 'post',
            data
        }).then(response => {
            const { data } = response
            dataHandler(resolve, data)
        }).catch(error => {
            if (error) {
                const resp = localUsers.login(data)
                // console.log("api", resp);
                dataHandler(resolve, resp)
            }
            else reject(error)
        })
    })
}


export function signUp(data) {
    
    function dataHandler(resolve, resp) {
        switch (resp.err) {
            case 0:
                resolve(resp)
                break;

            case 1:
                Message({
                    message: "用户已存在",
                    duration: 5 * 1000
                })
                break;

            default:
                break;
        }
    }

    return new Promise((resolve, reject) => {
        request({
            url: '/vue-element-admin/user/login',
            method: 'post',
            data
        }).then(response => {
            const { data } = response
            dataHandler(resolve, data)
        }).catch(error => {
            if (error) {
                const resp = localUsers.signup(data)
                console.log("api", resp);
                dataHandler(resolve, resp)
            }
            else reject(error)
        })
    })

}

export function getInfo(token) {
      
    function dataHandler(resolve, resp) {
        switch (resp.err) {
            case 0:
                resolve(resp)
                break;

            case 1:
                Message({
                    message: "会话已过期，请重新登录",
                    duration: 5 * 1000
                })
                break;

            default:
                break;
        }
    }

    return new Promise((resolve, reject) => {
        request({
            url: '/vue-element-admin/user/info',
            method: 'get',
            params: { token }
        }).then(response => {
            const { data } = response
            dataHandler(resolve, data)
        }).catch(error => {
            if (error) {
                const resp = localUsers.getInfo(token)
                // console.log("api", resp);
                dataHandler(resolve, resp)
            }
            else reject(error)
        })
    })
}

export function logout(token) {

    return new Promise((resolve, reject) => {
        request({
            url: '/vue-element-admin/user/logout',
            method: 'post'
        }).then(response => {
            const { data } = response
            resolve(data)
        }).catch(error => {
            if (error) {
                const resp = localUsers.logout(token)
                // console.log("api", resp);
                resolve(resp)
            }
            else reject(error)
        })
    })
}