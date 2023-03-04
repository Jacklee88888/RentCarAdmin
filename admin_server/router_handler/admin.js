// 导入数据库操作模块
const db = require("../db")
// 导入加密bcryptjs
const bcrypt = require('bcryptjs')
// 导入生成Token字符串的包jsonwebtoken
const jwt = require('jsonwebtoken')
// 导入token 解析秘钥
const secret = require("../config/secret")

// 管理员注册
exports.registerAdmin = (req, res) => {
    const adminInfo = req.body
    const sqlSelectName = ` select * from admin where adminname = ?`
    db.query(sqlSelectName, adminInfo.adminname, (err, results) => {
        if (err) return res.send({
            status: 1,
            message: err.message
        })
        if (results.length > 0) return res.send({
            status: 1,
            message: '账号已存在'
        })
        adminInfo.password = bcrypt.hashSync(adminInfo.password, 10)
        const sqlInsert = `insert into admin set ?`
        db.query(sqlInsert, { ...adminInfo }, (err, results) => {
            if (err) return res.send({
                status: 1,
                message: err.message
            })
           
            if (results.affectedRows !== 1) return res.send({
                status: 1,
                message: '用户注册失败'
            })
            // 注册成功
            res.send({
                status: 0,
                message: '注册成功'
            })
        })

    })
}

// 管理员登录
exports.loginAdmin = (req, res) => {
    const adminInfo = req.body
    console.log(adminInfo);
    const selectInfo = `select * from admin where adminname = ?`
    db.query(selectInfo, adminInfo.adminname, (err, results) => {
        //执行sql语句失败
        if (err) return res.send({
            status: 1,
            message: err.message
        })
        // 执行语句成功但查询不到数据
        if (results.length != 1) return res.send({
            status: 1,
            message: '该用户为注册，登录失败！'
        })
        // console.log(results);
        // 比较前端提交的密码和数据库的密码进行比对
        const compareResult = bcrypt.compareSync(adminInfo.password, results[0].password)
        // console.log(adminInfo.password == results[0].password);
        if (!compareResult) return res.send({
            status: 1,
            message: '密码错误，登录失败！'
        })
        const admin = { ...results[0], password: '', admin_pic: '' }
        const tokenStr = jwt.sign(admin, secret.jwtSecretKey, { expiresIn: secret.expirensIn })
        res.send({
            status: 0,
            message: '登录成功！',
            token: 'Bearer ' + tokenStr //!Bearer 后面有个空格
        })
    })
}
// 获取管理员信息
exports.getAdmin = (req,res)=>{
    const sqlSelectAdmin = ` select adminname,gender,email,phone,grade,admin_pic from admin where id = ?  `
    //?此时的user属性是根据 Authorization 属性提供的Token解析成功，express-jwt中间件帮我们挂载上去的,不是表单的body
    db.query(sqlSelectAdmin,req.auth.id,(err,resluts)=>{
        if(err) return res.send({
            status:1,
            message:err.message
        })
    
        if(resluts.length<1) return res.send({
            status:1,
            message:'获取管理员信息失败'
        })

        res.send({
            
            status:0,
            message:'获取管理员信息成功',
            data:resluts[0]
        })
    })

}