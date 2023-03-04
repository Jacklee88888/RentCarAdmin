<template>
  <div class="header-container">
    <div class="left-content">
      <el-button
        icon="el-icon-menu"
        size="medium "
        type="text"
        style="color: #fff"
        @click="handleMenu"
      ></el-button>
      <!-- 面包屑 -->
      <el-breadcrumb style="margin-left:10px">
        <el-breadcrumb-item v-for="(item) in tableList" :key="item.name"
        :class="$route.name === item.name ? 'one' : 'two'"
        >{{item.label}}</el-breadcrumb-item>
        <!-- 面包屑不能加to路径，容易造成同路径反复点击报错 -->
      </el-breadcrumb>
    </div>
    <div class="right-content">
      <el-dropdown>
        <span class="el-dropdown-link">
          <img class="userPhoto" src="../assets/头像1.webp" alt />
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>个人中心</el-dropdown-item>
          <el-dropdown-item>退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
  name: 'CommonHeader',
  data() {
    return {
      rightIndex: 0,
    }
  },
  computed: {
    ...mapState('tab', ['tableList']),
  },
  methods: {
    ...mapMutations('tab', { handleMenu: 'COLLAPSE_MENU' }),
  },
}
</script>

<style lang="less" scoped>
.header-container {
  padding: 0 10px;
  background-color: #333;
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .userPhoto {
    height: 40px;
    width: 40px;
    border-radius: 50%;
  }
  .el-dropdown-link {
    cursor: pointer;
    color: #fff;
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }
}
.left-content {
  display: flex;
  align-items: center; //同行元素在Y轴的排列
  // justify-content: flex-end;同行元素在X轴的排列
  // align-content: flex-end;同‘列’元素在Y轴的排列
  
  /deep/ .el-breadcrumb__item.one{
    .el-breadcrumb__inner {
      &.is-link {
        color: #fff;
      }
    }
  }
   /deep/ .el-breadcrumb__item.two{
    .el-breadcrumb__inner {
      &.is-link {
        color: #999;
      }
    }
  }
}
</style>