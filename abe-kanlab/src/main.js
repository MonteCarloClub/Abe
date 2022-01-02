import Vue from 'vue'
import App from './App.vue'
import router from './router'

// element-ui 的组件库
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

// 路由层面的权限控制
import './permission' 

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
