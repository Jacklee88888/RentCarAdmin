<template>
  <div>
    <div class="tabs">
      <el-tag
        size="small"
        :closable="item.name !== 'home'"
        v-for="(item,index) in tableList"
        :key="item.label"
        :effect="item.name ===$route.name ? 'dark' :  'light' "
        @click="handlTag(item)"
        @close="closeTag(item,index)"
      >{{ item.label }}</el-tag>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
  name: 'CommonTag',
  data() {
    return {}
  },
  computed: {
    ...mapState('tab', ['tableList']),
  },
  methods: {
    // 将store中的muatation的方法结构出来，用this.DELETE_TAG()调用即可
    ...mapMutations('tab', ['DELETE_TAG']),
    // 点击tag跳转
    handlTag(item) {
      if (item.path != this.$route.path) {
        this.$router.push(item.path)
      }
      console.log(this.tableList)
    },
    // 点击tag删除
    closeTag(item, index) {
      // // 删除前最后一个标签的索引值
      // console.log('删除前最后一个标签的索引值', this.tableList.length - 1)

      // 删除的是最后一个标签，
      if (index === this.tableList.length - 1) {
        console.log('删除的是最后一个')
        // 调用stor中mutation的DELETE_TAG方法
        this.DELETE_TAG(item)
        // 如果删除的标签是当前所在的标签，则路由跳转，否则路由不跳转
        if (item.name === this.$route.name) {
          this.$router.push(this.tableList[index - 1].path)
        }
      }
      // 删除的是不是最后一个标签
      else {
        console.log('删除的不是是最后一个')
        // 调用stor中mutation的DELETE_TAG方法
        this.DELETE_TAG(item)
        // 如果删除的标签是当前所在的标签，则路由跳转，否则路由不跳转
        if (item.name === this.$route.name) {
          this.$router.push(this.tableList[index].path)
        }
      }
      // // 删除完最后一个标签的索引值
      // console.log('删除后最后一个标签的索引值', this.tableList.length - 1)
      // console.log(item, '删除的标签的索引', index)
    },
  },
}
</script>

<style lang="less" scoped>

  .tabs{
    padding: 10px;
    .el-tag{
      margin-right: 15px;
      cursor: pointer;
    }
  }
</style>