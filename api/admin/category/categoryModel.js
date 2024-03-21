const mongo=require("mongoose")
const objectID=mongo.Types.ObjectId
const categorySchema=mongo.Schema({
    autoId:{type:Number,default:0},
    name:{type:String,default:objectID},
    isDeleted:{type:Boolean,default:false},
    createdAt:{type:Date,default:Date.now()}
})

module.exports=mongo.model("category",categorySchema)
