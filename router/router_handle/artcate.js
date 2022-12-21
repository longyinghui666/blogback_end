const nnd = require("../../mysql/index")

exports.getArticleCates = (req, res) => {
  const sql = 'select * from article where is_delete=0 order by id asc'
  nnd.query(sql, (err, results) => {
    // 1. 执行 SQL 语句失败
    if (err) return res.cc(err)
    // 2. 执行 SQL 语句成功
    res.send({
    status: 0,
    message: '获取文章分类列表成功！',
    data: results
    })
    })

  }