import request from '@/utils/request'
import { localUsers } from "../mock/users"
import { Message } from 'element-ui'

/**
 * 注册用户
 * @param {*} _data 来自 ui 界面的参数，用于发送请求，字段不一定和请求字段一致，需要转换一下
 * @returns Promise
 */
export function signUp(_data) {
    // 根据接口文档将字段转换成后台需要的
    // userName 用户名
    // userType 用户类型(user/org)
    // channel  用户所在通道
    // password 密码
    const data = {
        userName: _data.name,
        password: _data.password,
        userType: _data.role,
        channel : _data.channel
    }

    return new Promise((resolve, reject) => {
        request({
            url: '/user/create',
            method: 'post',
            data
        }).then(response => {
            // {
            //     "code":200, //200，成功；其他，失败
            //     "msg":"",
            //     "data":null 
            // }
            if (response.code === 200) {
                resolve(response.data)
            }
            else {
                reject(response)
            }
        }).catch(error => {
            // 调用 Mock 的数据
            if (error) {
                const resp = localUsers.signup(data)
                if (resp.err === 0) {
                    resolve(resp.data)
                }
                else {
                    Message({
                        message: "用户已存在",
                        duration: 5 * 1000
                    })
                }
            }
            else reject(error)
        })
    })
}


export function login(_data) {
    // fileName 用户名
    // password 密码
    const data = {
        fileName: _data.name,
        password: _data.password,
    }

    return new Promise((resolve, reject) => {
        request({
            url: '/dabe/user2',
            method: 'post',
            data
        }).then(response => {
            // {
            //     "code":200   200，成功；其他，失败
            //     "msg" :null  描述
            //     "data":user  user 实例
            // }
            if(response.code === 200) {
                resolve(response.data)
            }
            reject(response)
        }).catch(error => {
            if (error) {
                const resp = localUsers.login(data)
                if (resp.err === 0) {
                    resolve(resp.data)
                }
                else {
                    Message({
                        message: resp.msg,
                        duration: 5 * 1000
                    })
                }
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