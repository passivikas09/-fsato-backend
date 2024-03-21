const contact=require("./contactModel")

async function addEnquiry(req,res){
    let formdata=req.body
    let {name,email,mobile,country,message}=formdata
    let validations=[]
    if(!name){
        validations.push("name")
    }
    if(!email){
        validations.push("email")
    }
    if(!mobile){
        validations.push("mobile")
    }
    if(!country){
        validations.push("country")
    }
    if(!message){
        validations.push("message")
    }
    if(validations.length>0){
        res.send({
            success:false,
            status:400,
            message:validations.join("+")+"required"
        })
    }else{
        let contactObj= new contact()
        let total = await contact.countDocuments({isDeleted:false})
        contactObj.autoId=total+1
        contactObj.name=formdata.name
        contactObj.email=formdata.email
        contactObj.country=formdata.country
        contactObj.mobile=formdata.mobile  
        contactObj.message=formdata.message
        contactObj.save().then((item)=>{
            res.send({
                success:true,
                status:200,
                message:"enquiry added successfully",
                data:item
            })
        }).catch((err)=>{
            res.send({
                success:false,
                status:500,
                message:"Error:"+err
            })
        })
    }
}   


function allEnquiry(req,res){
    contact.find({isDeleted:false}).then((item)=>{
        res.send({
            success:true,
            status:200,
            message:"enquiry added successfully",
            data:item
        })
    }).catch((err)=>{
        res.send({
            success:false,
            status:500,
            message:"Error:"+err
        })
    })
}   

function singleEnquiry(req,res){
    contact.findOne({_id:req.body._id}).then((item)=>{
        if(!item){
            res.send({
                success:false,
                status:404,
                message:"Enquiry Doesnot exists"
            })
        }else{
            res.send({
                success:true,
                status:200,
                message:"user enquiry loaded successfully",
                data:item
            })   
        }
    }).catch((err)=>{
        res.send({
            success:false,
            status:500,
            message:"Error:"+err
        })
    })
}

function deleteEnquiry(req,res){
    contact.findOne({_id:req.body._id}).then((item)=>{
        if(!item){
            res.send({
                success:false,
                status:404,
                message:"Enquiry Doesnot exists"
            })
        }else{
            item.isDeleted=true
            item.save().then((result)=>{
                res.send({
                    success:true,
                    status:200,
                    message:" enquiry Deleted successfully",
                    data:result
                }) 
            }).catch((err)=>{
                res.send({
                    success:false,
                    status:400,
                    message:"Error:"+err
                })
            })  
        }
    }).catch((err)=>{
        res.send({
            success:false,
            status:500,
            message:"Error:"+err
        })
    })
} 

module.exports={addEnquiry,allEnquiry,singleEnquiry,deleteEnquiry}