const express=require('express')
const app=express()
const cors=require('cors')
const userRouter = require('./router/user')
const joi = require('joi')
const config = require('./config')
const expressJWT = require('express-jwt')

// 配置解析 Token 的中间件：
app.use(expressJWT({ secret: config.jwtSecretKey }).unless({ path: [/^\/api\//] }))
// 解析表单数据中间件，一定在路由前注册
app.use(express.urlencoded({ extended: false }))

// 响应数据的中间件
app.use(function (req, res, next) {
  // status = 0 为成功； status = 1 为失败； 默认将 status 的值设置为 1，方便处理失败的情况
  res.cc = function (err, status = 1) {
  res.send({
  // 状态
  status,
  // 状态描述，判断 err 是 错误对象 还是 字符串
  message: err instanceof Error ? err.message : err,
  })
  }
  next()
  })

app.use('/api', userRouter)
app.use(cors())

  // 错误中间件
  app.use(function (err, req, res, next) {
    // 数据验证失败
    if (err instanceof joi.ValidationError) return res.cc(err)
    // 未知错误
    res.cc(err)
    })
    // 错误中间件
app.use(function (err, req, res, next) {
  // 省略其它代码...
  // 捕获身份认证失败的错误
  if (err.name === 'UnauthorizedError') return res.cc('身份认证失败！')
  // 未知错误...
  })

app.listen(80,()=>{
  console.log('运行成功');
})