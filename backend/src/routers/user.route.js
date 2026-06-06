const express=require('express')
const router=express.Router()
const authcontroller=require('../controllers/user.controller')
const authmiddleware=require('../middleware/auth.middleware')
router.post('/register',authcontroller.register)
router.post('/login',authcontroller.login)
router.get('/logout',authcontroller.logout)
router.get('/getme',authmiddleware.authuser,authcontroller.getme)
module.exports=router