const nnd = require("../../mysql/index")
const jwt = require('jsonwebtoken')
const config=require('../../config')

  // 登录的处理函数----------------------------------------------------------------------------
  exports.login = (req, res) => {
    // 查询用户数据
const sql = `select * from nmd where name=?`
const userinfo = req.body
nnd.query(sql, userinfo.name, function (err, results) {
  // 执行 SQL 语句失败
  if (err) return res.cc(err)
  // 执行 SQL 语句成功，但是查询到数据条数不等于 1
  if (results.length !== 1) return res.cc('登录失败！')
  // TODO：判断用户输入的登录密码是否和数据库中的密码一致

// TODO：登录成功，生成 Token 字符串
const user = { ...results[0], password: ''}
console.log(user);
// 生成 Token 字符串
const tokenStr = jwt.sign(user, config.jwtSecretKey, {
  expiresIn: '10h', // token 有效期为 10 个小时
  })
  console.log(tokenStr);
  res.send({
    status: 0,
    message: '登录成功！',
    // 为了方便客户端使用 Token，在服务器端直接拼接上 Bearer 的前缀
    token: 'Bearer ' + tokenStr,
    })
  })

    
  }
  