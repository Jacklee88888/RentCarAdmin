import Vue from 'vue';
import Vuex from 'vuex'
// 引入持久化插件
import createPresistendState from 'vuex-persistedstate'
// tab模块
import tab from './tab';

Vue.use(Vuex)

export default new Vuex.Store({
    // store模块
    modules: {
        tab
    },
    plugins:[createPresistendState({
        // 储存方式
        storage:window.sessionStorage,
        // 在localStorage 或sessionStorage中存储的key值
        key:'vuexSate',
        // 需要保存的模块
        paths:['tab']

    })]
})