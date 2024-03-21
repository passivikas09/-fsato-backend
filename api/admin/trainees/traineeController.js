const trainee =require("./traineeModel")
const category= require("../category/categoryModel")
async function addTrainee(req,res){
    let formdata=req.body
    let validations=[]
    let {categoryId,totaltrainee,area}=formdata
    if(!categoryId){
        validations.push("category")
    }
    if(!totaltrainee){
        validations.push("no of trainee ")
    }
    if(!area){
        validations.push("area")
    }
    if(validations.length>0){
        res.send({
            success:false,
            status:400,
            message:validations.join('+')+"required"
        })
    }else{
        let total= await trainee.countDocuments({isDeleted:false})
        let traineeObj=new trainee()
        traineeObj.autoId=total+1
        traineeObj.categoryId=formdata.categoryId
        traineeObj.totaltrainee=formdata.totaltrainee
        traineeObj.area=formdata.area
        traineeObj.save().then((result)=>{
            res.send({
                success:true,
                status:200,
                message:"Added Successfully",
                data:result
            })
        }).catch((err)=>{
            res.send({
                success:false,
                status:500,
                message:"error"+err
            })
        })
    }
}

function totaltrained(req,res){
    trainee.aggregate([
        {
          '$group': {
            '_id': null   , 
            'totaltrainee': {
              '$sum': '$totaltrainee'
            }
          }
        }
      ]).then((item)=>{
        res.send({
            success:true,
            status:200,
            message:"Added Successfully",
            data:item
        })
      }).catch((err)=>{
        res.send({
            success:false,
                status:500,
                message:"error"+err
        })
      })
 
}

function allTrainee(req,res){
    trainee.find({isDeleted:false}).populate("categoryId").then((result)=>{
        res.send({
            success:true,
            status:200,
            message:"Added Successfully",
            data:result
        })
    }).catch((err)=>{
        res.send({
            success:false,
            status:500,
            message:"error"+err
        })
    })
}

 function categoryWise(req,res){
    trainee.find({categoryId:req.body._id,isDeleted:false}).populate("categoryId").then(async(result)=>{
        res.send({
            success:true,
            status:200,
            message:"Added Successfully",
            data:result 
        })
    }).catch((err)=>{
        res.send({
            success:false,
            status:500,
            message:"error"+err
        })
    })
}



function singleTrainee(req,res){
    trainee.findOne({_id:req.body._id,isDeleted:false}).populate("categoryId").then((item)=>{
        if(!item){
            res.send({
                success:false,
                status:404,
                message:"This Doesn't exists"
            })
        }else{
            res.send({
                success:true,
                status:200,
                message:"Added Successfully",
                data:item
            })
        }
    }).catch((err)=>{
        res.send({
            success:false,
            status:500,
            message:"error"+err
        })
    })
}

function deleteTrainee(req,res){
    trainee.deleteOne({_id:req.body._id,isDeleted:false}).then((item)=>{
        if(!item){
            res.send({
                success:false,
                status:404,
                message:"This Doesn't Exists"
            })
        }else{
            res.send({
                success:true,
                status:200,
                message:"Deleted successfully"
            })
        }
    }).catch((err)=>{
        res.send({
            success:false,
            status:500,
            message:"error"+err
        })
    })
}


function updateTrainee(req,res){
    let formdata=req.body
    trainee.findOne({_id:formdata._id ,isDeleted:false}).then((item)=>{
        if(!item){
            res.send({
                success:false,
                status:404,
                message:"This Doesn't Exists"
            })
        }else{
            if(!!formdata.area) item.area=formdata.area
            if(!!formdata.categoryId) item.categoryId=formdata.categoryId
            if(!!formdata.totaltrainee) item.totaltrainee=formdata.totaltrainee
            item.save().then((result)=>{
                res.send({
                    success:true,
                    status:200,
                    message:"Updated Successfully",
                    data:result
                })
            }).catch((err)=>{
                res.send({
                    success:false,
                    status:400,
                    message:"error"+err
                }) 
            })
        }
    }).catch((err)=>{
        res.send({
            success:false,
            status:500,
            message:"error"+err
        })
    })
}


async function totalcategorywise(req,res){
    trainee.aggregate([
        {
          '$group': {
            '_id': '$categoryId', 
            'categorywisetrainee': {
              '$sum': '$totaltrainee'
            }
          }
        }, {
          '$lookup': {
            'from': 'categories', 
            'localField': '_id', 
            'foreignField': '_id', 
            'as': 'results'
          }
        }
      ]).then((item)=>{
        if(!item){
            res.send({
                success:false,
                status:404,
                message:"doesn't exists"
            })
        }else{
            res.send({
                success:true,
                status:200,
                message:"successfull",
                data:item
            })
        }
    }).catch((err)=>{
        res.send({
            success:false,
            status:500,
            message:"error"+err
        })
    })
}

module.exports={addTrainee,singleTrainee,deleteTrainee, updateTrainee,categoryWise,allTrainee ,totaltrained ,totalcategorywise}