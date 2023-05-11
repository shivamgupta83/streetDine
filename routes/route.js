const router=require("express").Router()

const {createUser,loginUser}=require("../controller/userController")
const {createProduct,getProduct,updateProduct,deleteProduct} = require("../controller/productController")
const {authentication}=require("../mid/authentication")

router.post("/createUser",createUser)
router.post("/loginUser",loginUser)

router.post("/createProduct",createProduct)
router.get("/getProduct/:id?",getProduct)
router.post("/updateProduct/:id",updateProduct)
router.delete("/deleteProduct/:id",deleteProduct)


module.exports=router