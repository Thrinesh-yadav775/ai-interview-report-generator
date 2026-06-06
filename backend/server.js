require('dotenv').config()
const ai=require('./src/services/ai.service')
const app=require('./src/app')
const generatereport=require('./src/services/ai.service')
const PORT = process.env.PORT || 3000
app.listen(PORT,()=>{
    console.log(`server is running at port ${PORT} successfully`)
})
