<template>
  <div>
    <el-row>
      <el-col :span="8" style="padding-right : 10px">
        <!-- 用户卡片 -->
        <el-card class="userCard">
          <div class="user">
            <img src="../assets/头像1.webp" alt />
            <div>
              <p class="name">Admine</p>
              <p class="access">超级管理员</p>
            </div>
          </div>
          <hr />
          <div class="loginInfo">
            <p>
              上次登录时间：
              <span>2022-1-29</span>
            </p>
            <p>
              上次登录地点：
              <span>湛江</span>
            </p>
          </div>
        </el-card>
        <!-- 表格卡片 -->
        <el-card class="tableCard">
          <el-table :data="tableData" stripe style="width: 100%">
            <el-table-column
              v-for="(val,key) in tableLabel"
              :key="key"
              :prop="key"
              :label="val"
              width="90"
            ></el-table-column>
          </el-table>
        </el-card>
      </el-col>
      <el-col :span="16" style="padding-left : 10px">
        <!-- 订单模块 -->
        <div class="num">
          <el-card
            v-for="item in countData "
            :key="item.name"
            :body-style="{display:'flex',padding:'0px'}"
            class="numCard"
          >
            <i class="icon" :class="`el-icon-${item.icon}`" :style="{background:item.color}"></i>
            <div class="detail">
              <p class="price">￥{{item.value}}</p>
              <p class="desec">{{item.name}}</p>
            </div>
          </el-card>
        </div>
        <div class="chart">
          <el-card class="chartCard">
            <!-- 折线图 -->
            <div ref="echarts1" style="height:280px;"></div>
          </el-card>
        </div>
        <div class="graph">
          <el-card class="graphCard1">
            <div ref="echarts2" style="height:260px;"></div>
          </el-card>
          <el-card class="graphCard2">
            <div ref="echarts3" style="height:240px;"></div>
          </el-card>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { getData } from '../api/index'
import * as echarts from 'echarts'
export default {
  name: 'Home',
  data() {
    return {
      tableData: [],
      tableLabel: {
        name: '课程',
        todayBuy: '今日购买',
        monthBuy: '本月购买',
        totalBuy: '总计购买',
      },
      countData: [
        {
          name: '今日支付订单',
          value: 1234,
          icon: 'success',
          color: '#2ec7c9',
        },
        {
          name: '今日收藏订单',
          value: 210,
          icon: 'star-on',
          color: '#ffb980',
        },
        {
          name: '今日未支付订单',
          value: 1234,
          icon: 's-goods',
          color: '#5ab1ef',
        },
        {
          name: '本月支付订单',
          value: 1234,
          icon: 'success',
          color: '#2ec7c9',
        },
        {
          name: '本月收藏订单',
          value: 210,
          icon: 'star-on',
          color: '#ffb980',
        },
        {
          name: '本月未支付订单',
          value: 1234,
          icon: 's-goods',
          color: '#5ab1ef',
        },
      ],
    }
  },
  mounted() {
    // 发请求获取表格数据
    getData().then(({ data }) => {
      //将请求结果rsp中的data属性结构处理
      console.log('请求结果如下', data)
      const { tableData, userData, videoData } = data.data //将data.data.tableData 解构出来
      this.tableData = tableData

      // const { orderData } = data.data
      // const xAxis = Object.keys(orderData.data[0])
      // console.log(xAxis)
      // xAxis.forEach((key) => {
      //   const abc = orderData.data.map((item) => {
      //     console.log(item,key);
      //     return item[key]
      //   })
      //   console.log(abc);
      // })

      // 用ref给标签做绑定，然后初始化echarts实例
      const echarts1 = echarts.init(this.$refs.echarts1)
      // 指定图标的配置和数据
      var echartsOption1 = {}
      //处理数据xAxis
      const { orderData } = data.data
      //  用Object.keys()方法拿到對象的的屬性名（key值）的数组
      const legend = Object.keys(orderData.data[0])

      // x轴数据
      echartsOption1.xAxis = { data: orderData.date }
      // y轴数据
      echartsOption1.yAxis = {}
      // 每条线的品牌
      echartsOption1.legend = { data: legend }
      echartsOption1.title = { text: '月销量' }
      echartsOption1.series = []
      // 把数组的值作为变量进行循环
      legend.forEach((key) => {
        echartsOption1.series.push({
          name: key,
          // 对数组orderData.data进行重新处理后返回一个新数组
          data: orderData.data.map((item) => {
            // item是数组的每个值以item为变量进行循环，每次循环在item中找以key为属性名的值返回数组data中 ！！！！！！！！！
            return item[key] //每次返回的都是每个手机排对应的某次销售量，当map完成之后则返回该牌子的所有销售量，然后在进行下一个手机品牌的map
          }),
          type: 'line',
        })
      })
      // 使用刚指定的配置项和数据显示图表。
      echarts1.setOption(echartsOption1)

      // 创建柱状图实例echarts2
      const echarts2 = echarts.init(this.$refs.echarts2)
      var echartsOption2 = {
        title: {
          text: '用户',
        },
        legend: {
          // 图例文字颜色
          textStyle: {
            color: '#333',
          },
        },
        grid: {
          left: '20%',
        },
        // 提示框
        tooltip: {
          trigger: 'axis',
        },
        xAxis: {
          type: 'category', // 类目轴
          // 把数组userData中每一项对象item中date对应的值重新组成数组
          data: userData.map((item) => item.date),
          axisLine: {
            lineStyle: {
              color: '#17b3a3',
            },
          },
          axisLabel: {
            interval: 0,
            color: '#333',
          },
        },
        yAxis: [
          {
            type: 'value',
            axisLine: {
              lineStyle: {
                color: '#17b3a3',
              },
            },
          },
        ],
        color: ['#2ec7c9', '#b6a2de'],
        series: [
          {
            name: '新增用户',
            type: 'bar',
            data: userData.map((item) => item.new),
            // data:['你好1','你好2','你好3','你好4','你好5','你好6','你好7']
          },
          {
            name: '活跃用户',
            type: 'line',
            data: userData.map((item) => item.active),
          },
        ],
      }
      echarts2.setOption(echartsOption2)

      // 创建饼状图实例echarts3
      const echarts3 = echarts.init(this.$refs.echarts3)
      const echartsOption3 = {
        tooltip: {
          trigger: 'item',
        },
        color: [
          '#0f78f4',
          '#dd536b',
          '#9462e5',
          '#a6a6a6',
          '#e1bb22',
          '#39c362',
          '#3ed1cf',
        ],
        series: [
          {
            type: 'pie',
            data: videoData,
          },
        ],
      }
      echarts3.setOption(echartsOption3)
    })
  },
}
</script>

<style lang="less" scoped>
// 用户信息样式
.user {
  display: flex;
  align-items: center;
  img {
    width: 150px;
    height: 150px;
    border-radius: 50%;
    margin-right: 40px;
  }
  .name {
    font-size: 32px;
    margin-bottom: 10px;
    text-align: center;
  }
  .access {
    font-size: 18px;
    color: #999;
    text-align: center;
  }
}
// 登录信息样式
.loginInfo {
  align-items: center;
  p {
    color: #999;
    span {
      margin-left: 80px;
      color: black;
      text-align: center;
    }
  }
}
hr {
  margin: 20px 0px;
  color: #999;
}
// 表格样式
.tableCard {
  margin-top: 20px;
  height: 450px;
}
//订单模块样式
.num {
  display: flex;
  flex-wrap: wrap; //强制换行
  justify-content: space-between;
  .numCard {
    margin: 0px 0px 5px 5px;
    width: 32%;
  }
  .icon {
    height: 80px;
    width: 80px;
    font-size: 30px;
    color: aliceblue;
    text-align: center; //文字左右居中
    line-height: 80px; //文字上下居中
  }
  .detail {
    margin-left: 15px;
    display: flex; //线性盒子
    flex-direction: column; //改变主轴为上下排列
    justify-content: center; //主轴方向居中
    text-align: center; //文字左右居中
    .price {
      font-size: 30px;
      margin-bottom: 10px;
      line-height: 30px;
      height: 30px;
    }
    .desec {
      font-size: 14px;
      color: #999;
      text-align: center;
    }
  }
}
// 折线图样式
.chart {
  .chartCard {
    height: 280px;
    margin-top: 10px;
  }
}
// 柱状图和饼状图样式
.graph {
  display: flex;
  justify-content: space-between;
  .graphCard1,
  .graphCard2 {
    height: 260px;
    width: 48%;
    margin-top: 20px;
  }
}
</style>