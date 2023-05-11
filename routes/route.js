const router=require("express").Router()

const {createWishList,getWishList} = require("../controller/wishListController")
const {createUser,loginUser}=require("../controller/userController")
const {createProduct,getProduct,updateProduct,deleteProduct} = require("../controller/productController")

const {authentication}=require("../mid/authentication")

router.post("/createUser",createUser)
router.post("/loginUser",loginUser)

router.post("/createProduct",authentication,createProduct)
router.get("/getProduct/:productId?",authentication,getProduct)
router.post("/updateProduct/:productId",authentication,updateProduct)
router.delete("/deleteProduct/:productId",authentication,deleteProduct)

router.post("/createWishList",authentication,createWishList)
router.get("/getWishList/:userId",authentication,getWishList)

module.exports=router