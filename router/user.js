const express =require('express')
const router=express.Router()
const userHandler = require('./router_handle/user')
const expressJoi = require('@escook/express-joi')
const { reg_login_schema } = require('../schema/user')


router.post('/reguser', expressJoi(reg_login_schema), userHandler.regUser)

  router.post('/login',userHandler.login)

  module.exports = router
  