const user =require("../api/userapi/user/userModel")

async function AdminCreate(){
    let userObj=new user({
        name:"Admin",
        email:"Admin123@gmail.com",
        password:"$2b$10$D3qsXGRSHa5FK/6UcbDNR.bYceTKVoKdbmlxdHCcdHzPrj4MUEBQ2",
        address:"Tanda",
        contact:"9855257118",
        userType:1,
    })

let existiingUser= await user.findOne({email:userObj.email})
console.log(userObj.password)
if(!!existiingUser){
    console.log("Admin already exits")
}else{
    userObj.save().then(()=>{
        console.log("admin created successfully")
    }).catch((err)=>{
        console.log("error"+err)
    })
}
}

module.exports={AdminCreate}