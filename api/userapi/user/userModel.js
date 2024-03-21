const mongo=require('mongoose')
const userSchema=mongo.Schema({
    autoId:{type:Number,default:0},
    name:{type:String,default:""},
    email:{type:String,default:""},
    password:{type:String,default:""},
    address:{type:String,default:""},
    contact:{type:Number,default:0},
    userType:{type:Number,default:2},
    isDeleted:{type:Boolean,default:false},
    createdAt:{type:Date,default:Date.now()}
})
module.exports=mongo.model("user",userSchema)