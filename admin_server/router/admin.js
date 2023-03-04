// 导入数据库操作模块
const express = require('express')
// 创建路由对象
const router = express.Router()
// 导入用户路由处理函数
const  admin_handler = require('../router_handler/admin')

// 管理员注册
router.post('/register',admin_handler.registerAdmin)
// 管理员登录
router.post('/login',admin_handler.loginAdmin)
// 获取管理员信息
router.get('/getAdmin',admin_handler.getAdmin)
// 将管理员路由对象共享出去
module.exports = router