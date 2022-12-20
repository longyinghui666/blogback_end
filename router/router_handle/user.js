const nnd = require("../../mysql/index")
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

// 注册------------------------------------------
 exports.regUser = (req, res) => {
 // 接收表单数据
const userinfo = req.body
// 判断数据是否合法
if (!userinfo.name || !userinfo.password) {
return res.send({ status: 1, message: '用户名或密码不能为空！' })
}
const sql = `select * from nnd.nmd where name=?`
nnd.query(sql, userinfo.name, function (err, results) {
  // 执行 SQL 语句失败
  if (err) {
  return res.cc()
  }
  // 用户名被占用
  if (results.length > 0) {
  return res.send({ status: 1, message: '用户名被占用，请更换其他用户名！' })
  }
//  密码加密
console.log(userinfo);
userinfo.password = bcrypt.hashSync(userinfo.password, 10)
console.log(userinfo);

const sql = 'insert into nmd set ?'
nnd.query(sql, { name: userinfo.name, password: userinfo.password }, function
  (err, results) {
  // 执行 SQL 语句失败
  if (err) return res.cc()
  // SQL 语句执行成功，但影响行数不为 1
  if (results.affectedRows !== 1) {
  return res.send({ status: 1, message: '注册用户失败，请稍后再试！' })
  }
  // 注册成功
  res.send({ status: 0, message: '注册成功！' })
  })
  })
  }

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
  })
  // 拿着用户输入的密码,和数据库中存储的密码进行对比
const compareResult = bcrypt.compareSync(userinfo.password, results[0].password)
// 如果对比的结果等于 false, 则证明用户输入的密码错误
if (!compareResult) {
return res.cc('登录失败！')
}
// TODO：登录成功，生成 Token 字符串
const user = { ...results[0], password: ''}
console.log(user);
// 生成 Token 字符串
const tokenStr = jwt.sign(user, config.jwtSecretKey, {
  expiresIn: '10h', // token 有效期为 10 个小时
  })
  res.send({
    status: 0,
    message: '登录成功！',
    // 为了方便客户端使用 Token，在服务器端直接拼接上 Bearer 的前缀
    token: 'Bearer ' + tokenStr,
    })
    
  }
  