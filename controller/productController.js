let productModel = require("../models/productModel") 
let uploadFile = require("../aws/aws.js")
const {mongoose}=require("mongoose");
let validator = require("../validation/validation.js");


const createProduct = async function (req, res) {
    try {
        let data = req.body;
        let files = req.files;

        let { title, description } = data;
            
        if (!title) return res.status(400).send({ status: false, message: "Title is mandatory" });
        if (!validator.validAll(title)) return res.status(400).send({ status: false, message: "Title is in wrong format" });
    title = title.replace(/\s+/g, ' ').toLowerCase()

    if (!description) return res.status(400).send({ status: false, message: "Description is mandatory" });
    if (!validator.validAll(description)) return res.status(400).send({ status: false, message: "description is in wrong format" });
    description = description.replace(/\s+/g, ' ').toLowerCase()


        if (files.length == 0) return res.status(400).send({ status: false, message: "ProductImage is required" });

        let productImgUrl = await uploadFile(files[0]);
        if (!validator.validImage(productImgUrl)) {
            return res.status(400).send({ status: false, msg: "productImage is in incorrect format" })
        }
        data.Image = productImgUrl;

        let createProduct = await productModel.create(data);
        return res.status(201).send({ status: true, message: "product created sucessfully", data: createProduct });
    } catch (error) {
        return res.status(500).send({ status: false, message: error.message });
    }
}

const getProduct = async(req,res)=>{
    try{
    const id = req.params.id
    // console.log("id",id)
    if(id){
        if(!mongoose.isValidObjectId(id)) return res.status(400).send({status:false,message:"product id is not valid"})

        const data = await productModel.findById(id)
        if(!data) return res.status(404).send({status:false,message:"pruduct is not present"})
        if(data.isDeleted) return res.status(404).send({status:false,message:"pruduct is deleted"})
        return res.status (200).send({status:true,message:"sucess" , data:data})
    }

else {
    const data = await productModel.find({isDeleted:false})
    if(data.length==0) return res.status(404).send({status:false,message:"pruduct is not present"})
    return res.status (200).send({status:true,message:"sucess" , data:data})
}

}
catch(err){
    return res.status(500).send({ status: false, message: err.message });
}
}


const updateProduct = async(req,res)=>{
try
{   let data = req.body;
    let files = req.files;
    let id = req.params.id;
    let { title, description } = data;

  if(title)
   { if (!validator.validAll(title)) return res.status(400).send({ status: false, message: "Title is in wrong format" });
    title = title.replace(/\s+/g, ' ').toLowerCase()}

    if(description){
if (!validator.validAll(description)) return res.status(400).send({ status: false, message: "description is in wrong format" });
description = description.replace(/\s+/g, ' ').toLowerCase()
    }

    if (files.length != 0) {
        let productImgUrl = await uploadFile(files[0]);
        if (!validator.validImage(productImgUrl)) {
            return res.status(400).send({ status: false, msg: "productImage is in incorrect format" })
        }      
data.ImgUrl=productImgUrl;
    }

    let updateData = await  productModel.findByIdAndUpdate(id,{$set:{title:title,description:description,Image:data.ImgUrl}},{new:true});
    return res.status(200).send({status:true,message:"success",updateData:updateData})
}
catch(err){
    return res.status(500).send({status:false,message:err.message})
}
}

const deleteProduct=async(req,res)=>{
try{    
    let id = req.params.id;
if(!id) return res.status(400).send({status:false,message:"id is not present"});
if(!mongoose.isValidObjectId(id)) return res.status(400).send({status:false,message:"object id is not valid"})

let updateData = await  productModel.findByIdAndUpdate(id,{$set:{isDeleted:true}},{new:true});
return res.status(200).send({status:true,message:"success",updateData:updateData})
}
catch(error){
    return res.status(500).send({status:false,message:error.message})
}
}

module.exports={createProduct,getProduct,updateProduct,deleteProduct};