const express = require('express')
const router = express.Router()
// 导入车辆路由处理函数
const   cars_handler = require('../router_handler/cars')

// 展示车辆
router.get('/showCars',cars_handler.showCars)
// 新增汽车
router.post('/addCar',cars_handler.addCar)

// 编辑汽车
router.post('/editCar',cars_handler.editCar)

// 删除汽车
router.post('/deleteCar',cars_handler.deleteCar)

// 查询汽车（模糊查询）
router.post('/searchCars',cars_handler.searchCars)
// 向外暴露汽车路由
module.exports = router