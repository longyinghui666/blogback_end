// 导入 mysql 模块
const mysql = require('mysql')
// 创建数据库连接对象
const nnd = mysql.createPool({
host: '127.0.0.1',
user: 'root',
password: 'admin123',
database: 'nnd',
})
// 向外共享数据库连接对象
module.exports = nnd
