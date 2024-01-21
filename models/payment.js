const mongoose = require("mongoose")
const objectId = mongoose.Schema.Types.ObjectId

const wishList = new mongoose.Schema({

    userId: {
        type: objectId,
      
        require: true        
    },
    productId:
        {
    type:objectId,

    require :true
        }
}, { timestamps: true })


module.exports = mongoose.model("wishList", wishList)