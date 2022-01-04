import request from '@/utils/request'
import { localUsers } from "../mock/users"
import { Message } from 'element-ui'

export const userApi = {
    /**
     * 注册用户
     * @param {*} _data 来自 ui 界面的参数，用于发送请求，字段不一定和请求字段一致，需要转换一下
     * @returns Promise
     */
    signup: function (_data) {
        // 根据接口文档将字段转换成后台需要的
        // userName 用户名
        // userType 用户类型(user/org)
        // channel  用户所在通道
        // password 密码
        const data = {
            userName: _data.name,
            password: _data.password,
            userType: _data.role,
            channel: _data.channel
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
                    const resp = localUsers.signup(_data)
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
    },

    /**
     * 登录
     * @param {Object} _data 用于登录的信息用户名密码
     * @returns 登录成功则返回用户信息
     */
    login: function (_data) {
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
                //     "data": {
                //         "appliedAttrMap":{ },
                //         "privacyAttrMap":{},
                //         "APKMap":{},
                //         "ASKMap":{},
                //         "EGGAlpha":"[206605..., 320061...]",
                //         "Alpha":"907358...",
                //         "GAlpha":"[569334..., 105875...]",
                //         "Name":"someone",
                //         "OPKMap":{},
                //         "OSKMap":{ },
                //         "Password":"202cb962ac59075b964b07152d234b70",
                //         "UserType":"org",
                //         "Channel":"myc"
                //     }
                // }
                if (response.code === 200) {
                    const {data} = response
                    // 做一个字段转换
                    resolve({
                        name    : data.Name,
                        password: data.Password,
                        role    : data.UserType,
                        channel : data.Channel,
                        ...data
                    })
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
}