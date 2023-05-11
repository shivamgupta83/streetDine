const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    Image: {
        type: String,
        required: true,
        trim: true
    }  ,
    isDeleted:{
        type:Boolean,
        default:false
    } 
}, { timestamps: true })

module.exports = mongoose.model("Product", productSchema)