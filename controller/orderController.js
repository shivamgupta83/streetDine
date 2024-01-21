let Order = require('../models/order.js');
let Item = require('../models/item.js');
let validator = require('../validation/validation.js');

const createOrder = async function (req, res) {
  try {
    let { userId, orderItems } = req.body;
    if (!userId)
      return res
        .status(400)
        .send({ status: false, message: 'not present UserId' });

    for (let a = 0; a < orderItems.length; a++) {
      let ExistOrderItem = await Item.findById(orderItems[a]['id']);
      if (!ExistOrderItem) delete orderItems[a];
    }
    let createdOrder = await Order.create(req.body);

    return res.status(200).send({ status: true, message: createdOrder });
  } catch (err) {
    return res.status(500).send({ status: false, message: err.message });
  }
};

const updateOrder = async (req, res) => {
  try {
    let { userId, orderItems } = req.body;

    if (!userId)
      return res
        .status(400)
        .send({ status: false, message: 'not correct UserId' });

    for (let a = 0; a < orderItems.length; a++) {
      let ExistOrderItem = await Item.findById(orderItems[a]['id']);
      if (!ExistOrderItem) delete orderItems[a];
    }

    let updatedOrder = await Order.findOneAndUpdate(
      { userId },
      { orderItems },
      {
        new: true,
      }
    );
    if (updatedOrder)
      return res.status(200).send({ status: true, message: updatedOrder });
    else
      return res
        .status(500)
        .send({ status: true, message: 'something went wrong' });
  } catch (err) {
    return res.status(500).send({ status: false, message: err.message });
  }
};

module.exports = { createOrder, updateOrder };
