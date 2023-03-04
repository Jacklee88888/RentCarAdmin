<template>
  <div>
    <el-container>
      <!-- 侧边栏区 -->
      <el-aside width="auto">
        <common-aside />
      </el-aside>
      <el-container>
        <!-- 头部区 -->
        <el-header>
          <common-header />
        </el-header>
        <!-- 标签区 -->
        <common-tag />
        <!-- 内容区 -->
        <el-main>
          <!-- 子路由出口 -->
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import CommonAside from '../components/CommonAside.vue'
import CommonHeader from '../components/CommonHeader.vue'
import CommonTag from '../components/CommonTag.vue'
export default {
  components: { CommonAside, CommonHeader, CommonTag },
  name: 'Main',
  data() {
    return {}
  },
}
</script>

<style lang="less" scoped>
.el-header {
  padding: 0px;
}
</style>