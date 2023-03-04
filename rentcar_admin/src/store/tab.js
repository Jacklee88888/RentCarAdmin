export default {
    //开启域名
    namespaced: true,
    mutations: {
        COLLAPSE_MENU(state) {
            state.isCollapse = !state.isCollapse
        },
        // 更新面包屑数据
        SET_TABLELIST(state, value) {
            if (value.name !== 'home') {
                //indexOf(传入一个参数，若存在返回第一个参数的下表索引，不满足返回-1)
                //findIndex(传入一个函数进行筛选，满足条件第一个元素返回下表索引，不满足返回-1)
                if (state.tableList.findIndex(item => item.name === value.name) == -1) {
                    // 往面包屑数据中添加新数据
                    state.tableList.push(value)
                }
            }
        },
        // 删除指定的tag标签
        DELETE_TAG(state, value){
            const deleteItemIndex = state.tableList.indexOf(value)
            state.tableList.splice(deleteItemIndex,1)
            console.log(state.tableList,value);
        }
    },
    state: {
        // 控制侧边栏是否收缩
        isCollapse: false,
        // 面包屑数据
        tableList: [
            {
                path: '/home',
                name: 'home',
                label: '首页',
                icon: 's-home',
                url: 'Home/Home',
            },
        ]
    }
    

}