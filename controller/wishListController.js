let wishListController = require("../models/wishListModel");
let productModel = require("../models/productModel");
let { mongoose } = require("mongoose")

const createWishList = async (req, res) => {
    try {
        let { userId, productId } = req.body

        if (!userId) return res.status(400).send({ status: false, message: "userId is not present" });
        if (!mongoose.isValidObjectId(userId)) return res.status(400).send({ status: false, message: "userId id is not valid" })

        if (!productId) return res.status(400).send({ status: false, message: "productId is not present" });
        if (!mongoose.isValidObjectId(productId)) return res.status(400).send({ status: false, message: "productId is not valid" })

        let productData = await productModel.findById(productId);
        if (!productData) return res.status(500).send({ status: false, message: "product is not present" })
        if (productData.isDeleted) return res.status(500).send({ status: false, message: "product is deleted" })

        const data = await wishListController.create(req.body)

        return res.status(201).send({ status: true, message: "added whishList", data: data })
    }
    catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}

const getWishList = async (req, res) => {
    try {
        let userId = req.params.userId;
        if (!userId) return res.status(400).send({ status: false, message: "userId is not present" });
        if (!mongoose.isValidObjectId(userId)) return res.status(400).send({ status: false, message: "userId id is not valid" })

        let data = await wishListController.find({ userId });
        if (data.length == 0) return res.status(404).send({ status: false, message: "user does not have any product in whishList" })
        return res.status(200).send({ status: true, Data: data });
    }
    catch (error) {
        res.status(500).send({ status: false, message: error.message });
    }
}
module.exports = { createWishList, getWishList };