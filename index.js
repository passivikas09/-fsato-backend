const express=require("express")
const mongo=require("mongoose")
const path =require("path")
var cors=require("cors")
const app=express()
const port=5000
const userRouter=require("./routes/user")
const adminRouter=require("./routes/admin")
app.use(cors())
app.use(express.urlencoded())
app.use(express.json())
app.use("/api",userRouter)
app.use("/admin",adminRouter)
app.use(express.static(path.join(__dirname+"/public/")))
const seed= require("./config/seed")
seed.AdminCreate()
mongo.connect("mongodb+srv://fsatoperson1:person1fsato@cluster0.iwiglg2.mongodb.net/fsato").then(()=>{
     console.log("Database is running successfully")
}).catch((err)=>{
    console.log("error:"+err)
})

app.listen(port,()=>{
    console.log(`server is running at port${port}`)
})