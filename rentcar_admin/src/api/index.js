//? 引入二次封装的axios
import http from '../utils/request'


//!  以下是包装的请求

// 请求首页数据
export const getData = ()=>{
  // 返回一个promise对象
  return http.get('/home/getData')
}
// 请求用户列表
export const getUser = (params) =>{
  // 返回用户列表
  return http.get('/users/getUser',params)
}
//  请求添加用户
export const addUser = (data)=>{
  // 返回是否添加成功标志
  return http.post('/users/addUser',data)
}
// 请求删除用户
export const deleteUser = (data)=>{
  // 返回是否添加成功标志
  return http.post('/users/deleteUser',data)
}
//请求编辑用户
export const updateUser = (data)=>{
  // 返回是否添加成功标志
  return http.post('/users/updateUser',data)
}