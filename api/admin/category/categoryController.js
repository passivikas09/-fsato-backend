const category=require("./categoryModel")

async function addCategory(req,res){
    let formdata=req.body
    let validations=[]
    let {name}=formdata
    if(!name){
        validations.push("name")
    }
    if(validations.length>0){
        res.send({
            success:false,
            status:400,
            message:validations.join("+")+"required"
        })
    }else{
        let existiingCategory= await category.findOne({name:formdata.category})
        if(!!existiingCategory){
            res.send({
                success:false,
                status:400,
                message:"Category already exists"
            })
        }else{
        let total = await category.countDocuments({isDeleted:false})
        let categoryObj= new category()
        categoryObj.autoId=total+1
        categoryObj.name=formdata.name
        categoryObj.save().then((result)=>{
            res.send({
                success:true,
                status:200,
                message:"category add successfully",
                data:result
            })
        }).catch((err)=>{
            res.send({
                success:false,
                status:500,
                message:"Error"+err
            })
        })
    }
}
}



function allCategory(req,res){
    category.find({isDeleted:false}).then((result)=>{
        res.send({
            success:true,
            status:200,
            message:"categories loaded successfully",
            data:result
        })
    }).catch((err)=>{
        res.send({
            success:false,
            status:500,
            message:"Error"+err
        })     
    })
}

function singleCategory(req,res){
    category.findOne({_id:req.body._id,isDeleted:false}).then((item)=>{
        if(!item){
            res.send({
                success:false,
                status:404,
                message:"category not found"
            }) 
        }else{
            res.send({
                success:true,
                status:200,
                message:"categories loaded successfully",
                data:item
            })
        }
    }).catch((err)=>{
        res.send({
            success:false,
            status:500,
            message:"Error"+err
        }) 
    })
}

function deleteCategory(req,res){
    category.findOne({_id:req.body._id,isDeleted:false}).then((item)=>{
        if(!item){
            res.send({
                success:false,
                status:404,
                message:"category not found"
            }) 
        }else{
            item.isDeleted=true
            item.save().then((result)=>{
                res.send({
                    success:true,
                    status:200,
                    message:"categories loaded successfully",
                    data:result
                })
            }).catch((err)=>{
                res.send({
                    success:false,
                    status:400,
                    message:"Error"+err
                }) 
            })
        }
    }).catch((err)=>{
        res.send({
            success:false,
            status:500,
            message:"Error"+err
        }) 
    })
}

function updateCategory(req,res){
    let formdata=req.body
    let validations=[]
    let {newname}=formdata
    if(!newname){
        validations.push("name")
    }
    if(validations.length>0){
        res.send({
            success:false,
            status:400,
            message:validations.join("+")+"required"
        })
    }else{
    category.findOne({_id:req.body._id,isDeleted:false}).then((item)=>{
        if(!item){
            res.send({
                success:false,
                status:404,
                message:"category not found"
            }) 
        }else{
             if(!!formdata.newname)  item.name=req.body.newname
            item.save().then((result)=>{
                res.send({
                    success:true,
                    status:200,
                    message:"categories loaded successfully",
                    data:result
                })
            }).catch((err)=>{
                res.send({
                    success:false,
                    status:400,
                    message:"Error"+err
                }) 
            })
        }   
    }).catch((err)=>{
        res.send({
            success:false,
            status:500,
            message:"Error"+err
        }) 
    })}
}


module.exports={addCategory,allCategory,singleCategory,deleteCategory,updateCategory}