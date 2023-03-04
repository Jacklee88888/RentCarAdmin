const express = require('express')
const router = express.Router()
// 导入用户路由处理函数
const users_handler = require('../router_handler/users')

// 展示用户
router.get('/showUsers',users_handler.showUsersInfo)
// 编辑用户
router.post('/editUser',users_handler.editUserInfo)
// 删除用户
router.post('/deleteUser',users_handler.deleteUser)
// 搜索用户（模糊查询）
router.post('/searchUsers',users_handler.searchUsers)
// 向外暴露用户路由
module.exports =router