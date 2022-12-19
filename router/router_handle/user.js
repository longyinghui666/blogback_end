const nnd = require("../../mysql/index")
const bcrypt = require('bcryptjs')

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
  res.send('login OK')
  }
  