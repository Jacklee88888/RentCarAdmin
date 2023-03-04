// 导入mqsql数据库
const mysql = require('mysql')

// 创建数据库连接对象
const db = mysql.createPool({
    // 主机号
    host:'127.0.0.1',
    // 用户名
    user:'root',
    // 密码
    password:'123456',
    // 数据库名
    database:'my_db_01'


})

// 向外共享 db 数据库连接对象
module.exports = db