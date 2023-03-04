import Mock from 'mockjs'
// mock的处理函数
import homeApi from './mockServeData/home'
import userApi from './mockServeData/user'

//? 定义mock请求拦截

// 首页静态数据获取接口
Mock.mock('/api/home/getData', 'get', homeApi.getStatisticalData)
// 获取   用户接口
Mock.mock('/api/users/getUser', 'get', userApi.getUserList)
// 添加   用户接口
Mock.mock('/api/users/addUser', 'post', userApi.createUser)
// 删除   用户接口
Mock.mock('/api/users/deleteUser', 'post', userApi.deleteUser)
// 批量删除 用户接口
Mock.mock('/api/users/batchremoveUser', 'post', userApi.batchremove)
// 编辑   用户接口
Mock.mock('/api/users/updateUser', 'post', userApi.updateUser)

// 定义mock请求拦截
// Mock.mock('/api/home/getData', 'get', function () {
// 拦截到请求后的处理逻辑
//   console.log('mock拦截到了请求');
// 接口返回的data
//   return 1000
// })

export default Mock