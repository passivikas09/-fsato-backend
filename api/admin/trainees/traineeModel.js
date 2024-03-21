const mongo=require("mongoose")
const ObjectId=mongo.Types.ObjectId
const traineeSchema=mongo.Schema({
    autoId:{type:Number,default:0},
    categoryId:{type:ObjectId,default:null,ref:"category"},
    area:{type:String,default:""},
    totaltrainee:{type:Number,default:0},
    isDeleted:{type:Boolean,default:false},
    createdAt:{type:Date,default:Date.now()}
})
module.exports=mongo.model("trainee",traineeSchema)     