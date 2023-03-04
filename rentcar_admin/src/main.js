import Vue from 'vue'
import App from './App.vue'
//引入router
import router from './router';
// 引入vuex
import store from './store'
// 引入mock
import mock from'./api/mock'
//全局引入ElementUI
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';



Vue.config.productionTip = false
// 全局注册ElementUI
Vue.use(ElementUI)
new Vue({
  render: h => h(App),
  router,
  store,
  mock

}).$mount('#app')
