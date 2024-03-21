const mongo=require("mongoose")
const contactSchema= mongo.Schema({
    autoId:{type:Number,default:0},
    name:{type:String,default:''},
    email:{type:String,default:''},
    mobile:{type:Number,default:0},
    message:{type:String,default:""},
    country:{type:String,default:""},
    createdAt:{type:Date,default:Date.now()},
    isDeleted:{type:Boolean,default:false}  
})
module.exports=mongo.model("contact",contactSchema)