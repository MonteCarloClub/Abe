import { mutations, getters } from "./store";
import { login, signUp, getInfo, logout } from "../api/user"
import { setToken, removeToken } from '../utils/cookie'

// 与全局状态（store/state）有关的业务接口，即会改变全局状态的操作
export const actions = {
    // 注册
    signup(userInfo) {
        const { name, password } = userInfo
        return new Promise((resolve, reject) => {
            signUp({ name, password }).then(response => {
                const { data } = response
                resolve(data)
            }).catch(error => {
                reject(error)
            })
        })
    },
    // 登录
    login(userInfo) {
        const { name, password } = userInfo
        return new Promise((resolve, reject) => {
            login({ name, password }).then(response => {
                const { data } = response
                mutations.setToken(data.token)
                resolve(data)
            })
            .catch(error => {
                reject(error)
            })
        })
    },
    // 获取用户信息
    getInfo(token) {
        return new Promise((resolve, reject) => {
            getInfo(token).then(response => {
                const { data } = response
                mutations.setUser(data)
                resolve(data)
            }).catch(error => {
                reject(error)
            })
        })
    },

    // user logout
    logout() {
        return new Promise((resolve, reject) => {
            logout(getters.token()).then(() => {
                setToken('')
                removeToken()
                // resetRouter()
                resolve()
            }).catch(error => {
                reject(error)
            })
        })
    },

    resetToken() {
        return new Promise(resolve => {
            setToken('')
            removeToken()
            resolve()
        })
    },
}
