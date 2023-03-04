// 导入数据库操作模块
const db = require('../db/index')

// 展示车辆
exports.showCars = (req, res) => {
    const sqlSelectCar = `select * from carbarn `
    db.query(sqlSelectCar, (err, results) => {
        if (err) return res.send({
            status: 1,
            message: err.message
        })
        if (results.length < 1) return res.send({
            status: 0,
            message: '汽车展示失败！',

        })
        res.send({
            status: 0,
            message: '汽车展示成功！',
            data: results
        })

    })
}
// 新增车辆
exports.addCar = (req, res) => {
    const carInfo = req.body
    const sqlInsert = `insert into carbarn set ?`
    db.query(sqlInsert, carInfo, (err, results) => {
        //执行SQL语句失败
        if (err) {
            return res.send({
                status: 1,
                message: err.message
            })
        }
        //SQL语句执行成功，但影响行为数不为1
        if (results.affectedRows !== 1) {
            return res.send({
                status: 1,
                message: '新增汽车失败，请稍后再试'
            })
        }
        //注册成功
        return res.send({
            status: 0,
            message: '新增汽车成功'
        })
    })
}
// 编辑车辆
exports.editCar = (req, res) => {
    const sqlUpdateInfo = `update carbarn set ? where id=?`
    db.query(sqlUpdateInfo, [req.body, req.body.id], (err, results) => {
        // 执行 SQL 语句失败
        if (err) return res.send({
            status: 1,
            message: err.message
        })
        // 执行 SQL 语句成功，但影响行数不为 1
        if (results.affectedRows !== 1) return res.send({
            status: 1,
            message: '编辑汽车信息失败！'
        })//!数据库id不能改
        // 修改用户信息成功
        return res.send({
            status: 0,
            message: '编辑汽车信息成功！'
        })
    })
}
// 删除车辆
exports.deleteCar = (req, res) => {
    const sqlDeleteInfo = 'delete from carbarn where id = ?'
    db.query(sqlDeleteInfo, req.body.id, (err, results) => {
        
        if (err) res.send({
            status: 1,
            message: err.message
        })
        // 执行 SQL 语句成功，但影响行数不为 1
        if (results.affectedRows !== 1) return res.send({
            status: 1,
            message: '删除车辆失败！'
        })
        return res.send({
            status: 0,
            message: '删除车辆成功！'
        })
    })
}

//汽车模糊查询处理函数
exports.searchCars = (req, res) => {
    const searchText = "'%" + req.body.value + "%'"
    //定义汽车模糊查询SQL语句
    const sqlSearchCar = `select * from carbarn where carname like ${searchText} 
    or cartype like ${searchText} or carcolor like ${searchText} or carnumber like ${searchText} 
    or carprice like ${searchText} or cardesc like ${searchText} or logintime like ${searchText} `
    db.query(sqlSearchCar, (err, results) => {
        // SQL语句执行失败
        if (err) return res.send({
            status:1,
            message:err.message
        })
        // 执行SQL语句成功，但查询到的信息条数小于1
        if (results.length < 1) return res.send({
            status:1,
            message:'汽车搜索失败！'
        })
        // 将信息响应给客户端
        res.send({
            status: 0,
            message: '汽车搜索成功！',
            data: results
        })
    })
}