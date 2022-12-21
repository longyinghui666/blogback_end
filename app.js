const express = require("express");
const app = express();
const cors = require("cors");
const userRouter = require("./router/user");
// 表单验证
const joi = require("joi");
const config = require("./config");
const { expressjwt: expressJWT } = require("express-jwt");
const artCateRouter = require("./router/artcate");

app.use(cors());
// 配置解析 Token 的中间件：
app.use(
  expressJWT({ secret: config.jwtSecretKey, algorithms: ["HS256"] }).unless({
    path: [/^\/api\//],
  })
);
// 解析表单数据中间件，一定在路由前注册
app.use(express.urlencoded({ extended: false }));
app.use("/api", userRouter);
app.use("/my/article", artCateRouter);


// 错误中间件
app.use(function (err, req, res, next) {
  // 数据验证失败
  if (err instanceof joi.ValidationError) return res.cc(err);
  // 未知错误
  res.cc(err);
});
// 错误中间件
app.use(function (err, req, res, next) {
  // 省略其它代码...
  // 捕获身份认证失败的错误
  if (err.name === "UnauthorizedError") return res.cc("身份认证失败！");
  // 未知错误...
});

app.listen(80, () => {
  console.log("运行成功");
});
