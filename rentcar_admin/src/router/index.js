import Vue from 'vue'
//引入router
import VueRouter from 'vue-router';
// 全局注册router
Vue.use(VueRouter)

//1.创建路由组件（在views里创建好引入）
import Home from '../views/Home.vue';
import User from '../views/User.vue';
import Main from '../views/Main.vue';
import Mall from '../views/Mall.vue';
import PageOne from '../views/PageOne.vue';
import PageTwo from '../views/PageTwo.vue';
import Login  from '../views/Login.vue'


//2.将路由与组件进行映射
const routes = [
    {
        path: '/',
        component: Main,
        redirect: 'home',

        // 子路由
        children: [
            { path: 'home', name: 'home', component: Home },//首页路由
            { path: 'user', name: 'user', component: User },//用户管理路由
            { path: 'mall', name: 'mall', component: Mall },//商品管理路由
            { path: 'pageone', name: 'pageone', component: PageOne },//页面一路由
            { path: 'pagetwo', name: 'pagetwo', component: PageTwo },//页面二路由
        ]
    },
    {
        path:'/login',
        name:'login',
        component:Login
    }

]
//3.创建router实例
const router = new VueRouter({
    routes  //缩写 相当于 routes：routes
})
//4.向外暴露router
export default router
