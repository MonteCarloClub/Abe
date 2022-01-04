import Vue from 'vue';

const state = Vue.observable({
    user: false,
});

// 暴露给外部用于获取全局状态的接口
export const getters = {
    userName: () => state.user.name,
    isLogin: () => state.user ? true : false,
}

// 暴露给外部用于修改全局状态的接口
export const mutations = {
    setUser: (user) => {
        state.user = user
    },
}
