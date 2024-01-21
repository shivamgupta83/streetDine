let productModel = require('../models/item.js');
const { mongoose } = require('mongoose');
let validator = require('../validation/validation.js');

const createItem = async function (req, res) {
  try {
    let data = req.body;

    let { title, description, price } = data;

    if (!title)
      return res
        .status(400)
        .send({ status: false, message: 'Title is mandatory' });
    if (!validator.validAll(title))
      return res
        .status(400)
        .send({ status: false, message: 'Title is in wrong format' });
    title = title.replace(/\s+/g, ' ').toLowerCase();

    if (!description)
      return res
        .status(400)
        .send({ status: false, message: 'Description is mandatory' });
    if (!validator.validAll(description))
      return res
        .status(400)
        .send({ status: false, message: 'description is in wrong format' });
    description = description.replace(/\s+/g, ' ').toLowerCase();

    if (!price)
      return res
        .status(400)
        .send({ status: false, message: 'price is mandatory' });

    if (isNaN(price))
      return res
        .status(400)
        .send({ status: false, message: 'price should Number' });

    let createProduct = await productModel.create(data);
    return res.status(201).send({
      status: true,
      message: 'product created sucessfully',
      data: createProduct,
    });
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
};

const getItem = async (req, res) => {
  try {
    const productId = req.params.itemId;
    // console.log("id",productId)
    if (productId) {
      if (!mongoose.isValidObjectId(productId))
        return res
          .status(400)
          .send({ status: false, message: 'product id is not valid' });

      const data = await productModel.findById(productId);
      if (!data)
        return res
          .status(404)
          .send({ status: false, message: 'pruduct is not present' });
      if (data.isDeleted)
        return res
          .status(404)
          .send({ status: false, message: 'pruduct is deleted' });
      return res
        .status(200)
        .send({ status: true, message: 'sucess', data: data });
    } else {
      const data = await productModel.find({ isDeleted: false });
      if (data.length == 0)
        return res
          .status(404)
          .send({ status: false, message: 'pruduct is not present' });
      return res
        .status(200)
        .send({ status: true, message: 'sucess', data: data });
    }
  } catch (err) {
    return res.status(500).send({ status: false, message: err.message });
  }
};

const updateItem = async (req, res) => {
  try {
    let data = req.body;
    let id = req.params.itemId;
    let { title, description, price } = data;
    if (!id) {
      return res
        .status(404)
        .send({ status: false, message: 'item id is not given' });
    }
    if (title) {
      if (!validator.validAll(title))
        return res
          .status(400)
          .send({ status: false, message: 'Title is in wrong format' });
      title = title.replace(/\s+/g, ' ').toLowerCase();
    }

    if (description) {
      if (!validator.validAll(description))
        return res
          .status(400)
          .send({ status: false, message: 'description is in wrong format' });
      description = description.replace(/\s+/g, ' ').toLowerCase();
    }

    if (price) {
      if (isNaN(price))
        return res
          .status(400)
          .send({ status: false, message: 'price should Number' });
    }

    let updateData = await productModel.findByIdAndUpdate(
      id,
      {
        $set: {
          title: title,
          description: description,
          price: price,
        },
      },
      { new: true }
    );
    return res
      .status(200)
      .send({ status: true, message: 'success', updateData: updateData });
  } catch (err) {
    return res.status(500).send({ status: false, message: err.message });
  }
};

const deleteItem = async (req, res) => {
  try {
    let productId = req.params.itemId;
    if (!productId)
      return res
        .status(400)
        .send({ status: false, message: 'id is not present' });
    if (!mongoose.isValidObjectId(productId))
      return res
        .status(400)
        .send({ status: false, message: 'object id is not valid' });

    const productExist = await productModel.findById(productId);
    if (!productExist)
      return res
        .status(404)
        .send({ status: false, message: 'product is not exist' });
    if (productExist.isDeleted)
      return res
        .status(404)
        .send({ status: false, message: 'product is deleted' });

    let updateData = await productModel.findByIdAndDelete(productId);
    return res
      .status(200)
      .send({ status: true, message: 'successfully DELETED' });
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
};

module.exports = { createItem, getItem, updateItem, deleteItem };
