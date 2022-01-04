import { mutations, getters } from "./store";
import { login, logout } from "../api/user"
import { setToken, removeToken } from '../utils/cookie'

// 与全局状态（store/state）有关的业务接口，即会改变全局状态的操作
export const actions = {
    // 登录
    login(userInfo) {
        const { name, password } = userInfo
        return new Promise((resolve, reject) => {
            login({ name, password }).then(data => {
                mutations.setToken(data.token)
                mutations.setUser(data)
                resolve(data)
            })
            .catch(error => {
                reject(error)
            })
        })
    },

    // 退出登录
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
