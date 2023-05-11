let jwt= require("jsonwebtoken")

const authentication= (req,res,next)=>{

let token= req.header("accesstoken")
if(!token) return res.status(400).send({status:false,message:"Access Token is not present"})

jwt.verify(token,"key",(err,data)=>{
    if(err) return res.status(401).send({status:false,message:"token is not valid"})
    else{
        req.userData=data
        next();
    }
})
}

module.exports={authentication}