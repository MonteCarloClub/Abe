import Vue from 'vue';

const state = Vue.observable({
    user: false,
});

// 暴露给外部用于获取全局状态的接口
export const getters = {
    userName: () => state.user.name,
    isLogin: () => state.user ? true : false,
    // 根据传入的属性列表，返回一组箭头函数
    mapUser: (properties = []) => {
        const computed = {}
        properties.forEach(prop => computed[prop] = () => state.user[prop])
        return computed
    }
}

// 暴露给外部用于修改全局状态的接口
export const mutations = {
    setUser: (user) => {
        state.user = user
    },
}
