const enquiry= require("../../userapi/contact/contactModel")
const user=require("../../userapi/user/userModel")
const category=require("../category/categoryModel")
async function Dasboard(req,res){
    let Totalcontact= await enquiry.countDocuments({isDeleted:false})
    let Totaluser= await user.countDocuments({isDeleted:false})
    let Totalcategory= await category.countDocuments({isDeleted:false})

    let dashObj={}
    dashObj.contact=Totalcontact
    dashObj.users=Totaluser
    dashObj.categorys=Totalcategory
    enquiry.find({isDeleted:false}).sort({createdAt:-1}).limit(10).then((result)=>{
            dashObj.enquirys=result
        res.send({
            success:true,
            status:200,
            message:"loaded successfully",
            data:dashObj
        }) 
    }).catch((err)=>{
        res.send({
            success:false,
            status:400,
            message:"Error:"+err
        })
    })
}


module.exports={Dasboard}
