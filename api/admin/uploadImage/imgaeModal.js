const mongo =require("mongoose")
const ImageSchema= mongo.Schema({
    autoId:{type:Number,default:0},
    imagename:{type:String,default:""},
    image:{type:String,default:''},
    createdAt:{type:Date,default:Date.now()},
    isDeleted:{type:Boolean,default:false}
})
module.exports=mongo.model("image",ImageSchema)