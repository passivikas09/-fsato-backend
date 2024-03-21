const user = require('./userModel')
const bcrypt=require("bcrypt")
const salt=10
async function addUser(req, res) {
    let formdata = req.body
    let validations = []
    let { name, email, password, contact, address } = formdata
    if (!name) {
        validations.push("name")
    }
    if (!email) {
        validations.push("email")
    }
    if (!password) {
        validations.push("password")
    }
    if (!contact) {
        validations.push('contact')
    }
    if (!address) {
        validations.push("adress")
    }
    if (validations.length > 0) {
        res.send({
            success: false,
            status: 400,
            message: validations.join("+") + "required"
        })
    } else {
        let total = await user.countDocuments({isDeleted:false})
        let userObj = new user()
        userObj.autoId = total + 1     
        userObj.name = formdata.name 
        userObj.email = formdata.email 
        let encrpytpwd= bcrypt.hashSync(formdata.password,salt)
        userObj.password= encrpytpwd 
        userObj.address= formdata.address 
        userObj.contact= formdata.contact 
        userObj.save().then((item) => {
            res.send({
                success: true,
                status: 200,
                message: "user added successfully",
                data: item
            })
        }).catch((err) => {
            res.send({
                success: false,
                status: 500,
                message: "error:" + err,
            })
        })
    }
}

//all user

function allUser(req,res){
    user.find({isDeleted:false}).then((item)=>{
        if(!item){
            res.send({
                success: false,
                status: 400,
                message: "Something went wrong!!",
            })
        }else{
            res.send({
                success:true,
                status: 200,
                message:"All user Loaded Successfully",
                data:item
            }) 
        }
    }).catch((err)=>{
        res.send({
            success: false,
            status: 500,
            message: "error:" + err,
        })
    })
}


function singleUser(req,res){
    user.findOne({_id:req.body._id}).then((item)=>{
        if(!item){
            res.send({
                success: false,
                status: 404,
                message: "user doesn't exists",
            })
        }else{
            res.send({
                success:true,
                status: 200,
                message:"All user Loaded Successfully",
                data:item
            }) 
        }
    }).catch((err)=>{
        res.send({
            success: false,
            status: 500,
            message: "error:" + err,
        })
    })
}

function deleteUser(req,res){
    user.findOne({_id:req.body._id}).then((item)=>{
        if(!item){
            res.send({
                success: false,
                status: 404,
                message: "user doesnot existed" ,
            })
        }else{
            item.isDeleted=true
            item.save().then((result)=>{
                res.send({
                    success:true,
                    status:200,
                    message: "User Deleted Successfully" ,
                    data:result
                })
            }).catch((err)=>{
                res.send({
                    success: false,
                    status: 400,
                    message: "error:" + err,
                })      
            })
        }   
    }).catch((err)=>{
        res.send({
            success: false,
            status: 500,
            message: "error:" + err,
        })
    })
}

function updateUser(req,res){
    let formdata=req.body
    user.findOne({_id:formdata._id}).then((item)=>{
        if(!item){
            res.send({
                success: false,
                status: 404,
                message: "user doesnot existed" ,
            })
        }else{
            item.name=formdata.name
            item.email=formdata.email
            item.password= formdata.password
            item.address= formdata.address
            item.contact=formdata.contact
            item.save().then((result)=>{
                res.send({
                    success:true,
                    status: 200,
                    message: "User updated successfully",
                    data:result
                })
            }).catch((err)=>{
                res.send({
                    success: false,
                    status: 400,
                    message: "erorr:"+err ,
                })
            })
        }
    }).catch((err)=>{
        res.send({
            success: false,
            status: 500,
            message: "error:" + err,
        })
    })
}


function forgotpwd(req,res){
    let salt=10
    let formdata=req.body
    let validations=[]
    let {newpassword, repassword}=formdata
    if(!newpassword){
        validations.push("new password ")
    }
    if(!repassword){
        validations.push("re-enter password ")
    }
    if(validations.length>0){
        res.send({
            success:false,
            status:400,
            message:validations.join("+")
        })
    }else{user.findOne({_id:formdata._id}).then((item)=>{
        if(!item){
            res.send({
                success:false,
                status:404,
                message:"User not found"
            })
        }else{
            let encrpytpwd=bcrypt.hashSync(formdata.newpassword,salt)
            item.password=encrpytpwd  
            if(formdata.newpassword!=formdata.repassword){
                res.send({
                    success:false,
                    status:400,
                    message:"Password doesn't match"
                })
            }else{
                item.save().then((result)=>{
                    res.send({
                        success:true,
                        status:200,
                        message:"Password changed successfully",
                        data:result
                    })    
                }).catch((err)=>{
                    res.send({
                        success:false,
                        status:400,
                        message:"Erorr"+err
                    })
                })
            }
        }
    }).catch((err)=>{
        res.send({
            success:false,
            status:500,
            message:"Error"+err
        })
    })}
}

module.exports={addUser,allUser,singleUser,deleteUser,updateUser,forgotpwd}