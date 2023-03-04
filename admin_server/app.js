// 创建express服务器实例
const express = require('express')
const app = express()
// 导入并配置跨域中间件
const cors = require('cors')
// 配置jwt中间件，校验前端是否携带token
const expressJwt = require('express-jwt')
// 导入token 解析秘钥
const secret = require("./config/secret")
app.use(expressJwt.expressjwt({
    // credentialsRequired: false,//关键
    secret: secret.jwtSecretKey,//加密秘钥
    algorithms: ["HS256"] //最新版本需要配置algorithms算法
}).unless({
    path: ['/api/login','/api/register']
}))

app.use(cors())
// 配置解析表单数据的中间件，这个中间件只能jiexapplication/x-www-form-urlencoded格式数据
app.use(express.urlencoded({ extended: false }))
//*------------------------路由区域-------------------------
// 导入并注册管理员路由模块
const adminRouter = require('./router/admin')
app.use('/api', adminRouter)
// 导入并注册管汽车路由模块
const carsRouter = require('./router/cars')
app.use('/cars', carsRouter)
// 导入并注册管用户路由模块
const usersRouter = require('./router/users')
app.use('/users', usersRouter)

// app.get('/',(req,res)=>{
//     res.send('你好呀')
// })
//*------------------------路由区域-------------------------

//*全局错误级别中间件
app.use((err, req, res, next) => {
    // //验证失败导致的错误
    // if (err instanceof joi.ValidationError) {
    //     return res.cc(err)
    // }
    //身份认证失败后的错误
    if (err.name === 'UnauthorizedError') {
        res.send({
            status: 1,
            message: '身份认证失败！用戶未登录！！(前端没有携带token)'
        })
    }
    //未知错误
    res.send({
        status: 1,
        message: err.message
    })


})
// 启动服务器
app.listen(3000, () => {
    console.log('api server running at http://127.0.0.1:3000');
})