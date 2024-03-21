const imageupload=require("./imgaeModal")

async function addImage(req,res){
    let imageObj=new imageupload()
    let total= await imageupload.countDocuments({isDeleted:false})
    imageObj.autoId=total+1
    if(!!req.file){
      console.log(req.file)      
    imageObj.image="/images/"+req.file.filename 
    }
    imageObj.imagename=req.body.imagename
    imageObj.save().then((result)=>{
        res.send({
            success:true,
            status:200,
            message:'upload successfully',
            data:result
        })
    }).catch((err)=>{
        res.send({
            success:false,
            status:500,
            message:'Error'+err
        })
    })
}




function allImage(req,res){
    imageupload.find({isDeleted:false}).then((result)=>{
        res.send({
            success:true,
            status:200,
            message:'upload successfully',
            data:result
        })
    }).catch((err)=>{
        res.send({
            success:false,
            status:500,
            message:'Error'+err
        })
    })
}


function singleImage(req,res){
    imageupload.findOne({_id:req.body._id}).then((item)=>{
        if(!item){
            res.send({
                success:false,
                status:404,
                message:'Image doesn;t exists',
            })
        }else{
            res.send({
                success:true,
                status:200,
                message:'upload successfully',
                data:item
            }) 
        }
    }).catch((err)=>{
        res.send({
            success:false,
            status:500,
            message:'Error'+err
        })
    })
}


function deleteImage(req,res){
     imageupload.findOne({_id:req.body._id}).then((item)=>{
        if(!item){
            res.send({
                success:false,
                status:404,
                message:'Error'+err
            })
        }else{
            item.isDeleted=true     
            item.save().then(()=>{
                res.send({
                    success:true,
                    status:200,
                    message:'deleted successfully',
                    data:item
                })
            }).catch((err)=>{
                res.send({
                    success:false,
                    status:400,
                    message:'Error'+err
                })
            })
        }
     }).catch((err)=>{
        res.send({
            success:false,
            status:500,
            message:'Error'+err
        })
     })   
}


function updateImage(req,res){
    imageupload.findOne({_id:req.body._id}).then((item)=>{
        if(!item){
            res.send({
                success:false,
                status:404,
                message:"image not found"
            })
        }else{
          if(!!req.body.imagename) item.imagename=req.body.imagename
          item.save().then((result)=>{
                res.send({
                    success:true,
                    status:200,
                    message:'Updated successfully',
                    data:result
                })
            }).catch((err)=>{
                res.send({
                    success:false,
                    status:400,
                    message:'Error'+err
                })
            })
        }
    }).catch((err)=>{
        res.send({
            success:false,
            status:500,
            message:'Error'+err
        })
    })
}

module.exports={addImage,allImage,singleImage,deleteImage,updateImage}