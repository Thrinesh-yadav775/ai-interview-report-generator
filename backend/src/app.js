const express=require('express')
const authrouter=require('./routers/user.route')
const interviewrouter=require('./routers/interview.routers')
const cookieparser=require('cookie-parser')
const cors=require('cors')
const app=express()
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:3001', 'https://ai-interview-report-generator-snowy.vercel.app'],
  credentials: true,
}))
app.use(cookieparser())
app.use(express.json())
app.use('/api/user',authrouter)
app.use('/api/interview',interviewrouter)
module.exports=app