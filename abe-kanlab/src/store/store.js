import Vue from 'vue';
import { setToken, getToken } from '../utils/cookie'

const state = Vue.observable({
    username: false,
    token: getToken()
});

// 暴露给外部用于获取全局状态的接口
export const getters = {
    userLogin: () => state.token,
    userName: () => state.username,
    token: () => state.token
}

// 暴露给外部用于修改全局状态的接口
export const mutations = {
    setUser: (user) => {
        state.username = user.name
    },
    setToken: (token) => {
        setToken(token)
        state.token = token
    }
}
