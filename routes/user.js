const userRouter=require("express").Router()
const user=require("../api/userapi/user/userController")
const enquiry=require("../api/userapi/contact/contactController")
const login=require("../api/userapi/login/login")

userRouter.post("/user/add",user.addUser)
userRouter.post("/user/single",user.singleUser)
userRouter.post("/login",login.login)
userRouter.post("/user/forgotpassword",user.forgotpwd)
//enquiry
userRouter.post("/enquiry/add",enquiry.addEnquiry)

//images
module.exports=userRouter