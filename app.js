const express=require('express')
const app=express()
const cors=require('cors')
const userRouter = require('./router/user')

app.use('/api', userRouter)
app.use(express.urlencoded({ extended: false }))
app.use(cors)



app.listen(80,()=>{
  console.log('运行成功');
})