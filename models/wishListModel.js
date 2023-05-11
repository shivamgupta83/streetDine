const mongoose = require("mongoose")
const objectId = mongoose.Schema.Types.ObjectId

const wishList = new mongoose.Schema({

    userId: {
        type: objectId,
        ref: "User",
        require: true        
    },
    productId:{
    type:objectId,
    ref:"Product",
    require :true
}
}, { timestamps: true })


module.exports = mongoose.model("wishList", wishList)