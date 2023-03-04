const db = require('../db/index')

// 展示用户
exports.showUsersInfo = (req, res) => {

    const sqlSelectUsers = `select * from users`
    db.query(sqlSelectUsers, (err, results) => {
        if (err) return res.send({
            status: 1,
            message: err.message
        })
        if (results.length < 1) return res.send({
            status: 1,
            message: '用户展示失败！'
        })
        res.send({
            status: 0,
            message: '用户展示成功',
            data: results
        })
    })
}
//添加用户的处理函数
exports.addUser = (req, res) => {
    const userInfo = req.body
    //* 2.定义SQL语句，查询用户名是否被占用
    const sqlSelect = `select * from users where username = ?`
    db.query(sqlSelect, userInfo.username, (err, results) => {
        //执行sql语句失败
        if (err) {
            return res.send({
                status: 1,
                message: err.message
            })
        }
        //用户名被占用
        if (results.length > 0) {
            return res.send({
                status: 1,
                message: '用户名被占用，请更换其他用户名'
            })
        }
        //* 3.调用 bcrypt.hashSync()对密码进行加密,返回值是加密之后的密码字符串
        userInfo.password = bcrypt.hashSync(userInfo.password, 10)
        //* 4定义插入用户的SQL语句 
        const sqlInsert = `insert into users set ?`
        db.query(sqlInsert, userInfo, (err, results) => {
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
                    message: '注册用户失败，请稍后再试'
                })
            }
            //注册成功
            return res.send({
                status: 0,
                message: '注册成功'
            })
        })
    })

}

//编辑用户的处理函数
//?提交信息的都要经过表单验证(后端不能相信前端提供的信息所以得验证)
exports.editUserInfo = (req, res) => {
    const sqlUpdateInfo = `update users set ? where id=?`
    db.query(sqlUpdateInfo, [req.body, req.body.id], (err, results) => {
        // 执行 SQL 语句失败
        if (err) return res.send({
            status: 1,
            message: err.message
        })
        // 执行 SQL 语句成功，但影响行数不为 1
        if (results.affectedRows !== 1) return res.send({
            status: 1,
            message: '修改用户信息失败'
        })//!数据库id不能改
        // 修改用户信息成功
        return res.send({
            status: 0,
            message: '修改用户信息成功成功'
        })
    })
}
// 删除用户
exports.deleteUser = (req, res) => {
    const sqlDeleteInfo = 'delete from users where id = ?'
    db.query(sqlDeleteInfo, req.body.id, (err, results) => {
        console.log(results);
        if (err) res.send({
            status: 1,
            message: err.message
        })
        // 执行 SQL 语句成功，但影响行数不为 1
        if (results.affectedRows !== 1) return res.send({
            status: 1,
            message: '删除用户失败！'
        })
        return res.send({
            status: 0,
            message: '删除用户成功!'
        })
    })
}
// 查询用户
exports.searchUsers = (req, res) => {
    const searchText = "'%" + req.body.value + "%'"
    const sqlSearchUsers = ` select * from users where username like ${searchText} 
    or email like  ${searchText}  or number like  ${searchText}  or nickname like ${searchText} `
    db.query(sqlSearchUsers,(err,results)=>{
        // SQL语句执行失败
        if (err) return res.send({
            status:1,
            message:err.message
        })
        // 执行SQL语句成功，但查询到的信息条数小于1
        if (results.length < 1) return res.send({
            status:1,
            message:'用户搜索失败！'
        })
        // 将信息响应给客户端
        res.send({
            status: 0,
            message: '用户搜索成功！',
            data: results
        })
    })
}