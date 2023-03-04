<template>
  <div>
    <el-menu
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      :collapse="isCollapse"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
    >
      <h4>{{isCollapse ? '后台' :'租车帝后台管理统系'}}</h4>
      <!-- 没有子菜单的 -->
      <el-menu-item
        v-for="item in noChildren"
        :key="item.name"
        :index="item.name"
        @click="clickMenu(item),SET_TABLELIST(item)"
      >
        <!-- 点击事件可以绑定多个 -->
        <i :class="`el-icon-${item.icon}`"></i>
        <span slot="title">{{ item.label }}</span>
      </el-menu-item>
      <!-- 有子菜单的 -->
      <el-submenu v-for="items in hasChildren" :key="items.label" :index="items.label">
        <template slot="title">
          <i :class="`el-icon-${items.icon}`"></i>
          <span slot="title">{{ items.label }}</span>
        </template>
        <el-menu-item-group>
          <el-menu-item
            v-for="item in items.children"
            :key="item.name"
            :index="item.name"
            @click="clickMenu(item),SET_TABLELIST(item)"
          >{{ item.label }}</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
export default {
  name: 'CommonAside',
  data() {
    return {
      menuData: [
        {
          path: '/home',
          name: 'home',
          label: '首页',
          icon: 's-home',
          url: 'Home/Home',
        },
        {
          path: '/mall',
          name: 'mall',
          label: '汽车管理',
          icon: 'video-play',
          url: 'MallManage/MallManage',
        },
        {
          path: '/user',
          name: 'user',
          label: '用户管理',
          icon: 'user',
          url: 'UserManage/UserManage',
        },
        {
          label: '其他',
          icon: 'location',
          children: [
            {
              path: '/pageone',
              name: 'pageone',
              label: '页面1',
              icon: 'setting',
              url: 'Other/PageOne',
            },
            {
              path: '/pagetwo',
              name: 'pagetwo',
              label: '页面2',
              icon: 'setting',
              url: 'Other/PageTwo',
            },
          ],
        },
      ],
    }
  },

  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath)
    },
    clickMenu(item) {
      if (item.path != this.$route.path) {
        this.$router.push(item.path)
      }
      // console.log(this.tableList)
    },
    ...mapMutations('tab', ['SET_TABLELIST']),
  },
  computed: {
    // 用计算属性即将后端给的侧边栏数据进行过滤分成 有子菜单 和无子菜单的
    //没有子菜单
    noChildren() {
      return this.menuData.filter((item) => !item.children)
    },
    //有子菜单
    hasChildren() {
      return this.menuData.filter((item) => item.children)
    },
    //  isCollapse() {
    //   return this.$store.state.tab.isCollapse;
    // },
    ...mapState('tab', ['isCollapse', 'tableList']),
  },
  
}
</script>
<style lang="less"  scoped>
.el-menu {
  width: 200px;
  height: 900px;
  h4 {
    text-align: center;
    color: #fff;
    line-height: 48px;
    font-size: 16px;
    font-weight: 400;
  }
  border-right: none;
}
</style>