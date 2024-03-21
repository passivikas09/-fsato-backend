const adminRouter=require("express").Router()
const user=require("../api/userapi/user/userController")
const enquiry=require("../api/userapi/contact/contactController")
const category=require("../api/admin/category/categoryController")
const trainee=require("../api/admin/trainees/traineeController")
const admindashboard=require("../api/admin/dashboard/dashboard")
const adminupload=require("../api/admin/uploadImage/imageuploadController")
const multer=require('multer')
//user
adminRouter.get("/user/all",user.allUser)
adminRouter.post("/user/single",user.singleUser)
adminRouter.post("/user/delete",user.deleteUser)
adminRouter.put("/user/update",user.updateUser)
adminRouter.post("/user/add",user.addUser)

//category
adminRouter.get("/category/all",category.allCategory)
adminRouter.post("/category/add",category.addCategory)
adminRouter.post("/category/single",category.singleCategory)
adminRouter.post("/category/delete",category.deleteCategory)
adminRouter.put("/category/update",category.updateCategory)

//enquiry
adminRouter.get("/enquiry/all",enquiry.allEnquiry)
adminRouter.post("/enquiry/add",enquiry.addEnquiry)
adminRouter.post("/enquiry/single",enquiry.singleEnquiry)
adminRouter.post("/enquiry/delete",enquiry.deleteEnquiry)

//trainee
adminRouter.get("/trainee/all",trainee.allTrainee)
adminRouter.post("/trainee/add",trainee.addTrainee)
adminRouter.post("/trainee/categorywise",trainee.categoryWise)
adminRouter.post("/trainee/single",trainee.singleTrainee)
adminRouter.post("/trainee/delete",trainee.deleteTrainee)
adminRouter.put("/trainee/update",trainee.updateTrainee)
adminRouter.post("/totaltrained",trainee.totaltrained)
adminRouter.post("/trainee/totalcategorywise",trainee.totalcategorywise)

//image add
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/images')
    },
    filename: function (req, file, cb) {
        console.log(" heyyy"+file)
      cb(null, file.originalname)
    }
  })
  
  const ImageUpload = multer({ storage: storage })

adminRouter.post("/image/add",ImageUpload.single("image"),adminupload.addImage)
adminRouter.get('/image/all',adminupload.allImage)
adminRouter.post("/image/single",adminupload.singleImage  )
adminRouter.post("/image/delete",adminupload.deleteImage)
adminRouter.put("/image/update",adminupload.updateImage)

//dashboard
adminRouter.post("/dashboard",admindashboard.Dasboard)
module.exports=adminRouter