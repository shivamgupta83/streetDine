let Item = require('../models/item.js');
const User = require('../models/user.js');
const Order = require('../models/order.js');

const payment = async (req, res) => {
  try {
    const { userId, paying, mode } = req.body;

    if (!userId)
      return res
        .status(400)
        .send({ status: false, message: 'user id is not present' });

    if (!paying)
      return res
        .status(400)
        .send({ status: false, message: 'paying is not present' });

    let isOrderExist = await Order.findOne({ userId });

    if (isOrderExist.orderItems.length == 0)
      return res
        .status(404)
        .send({ status: false, message: 'order is not present' });
    else {
      let payment = 0;
      for (let a = 0; a < isOrderExist.orderItems.length; a++) {
        const item = isOrderExist.orderItems[a];
        if (item == null) continue;
        const itemQty = item.qty;
        const itemId = item.id;

        const isItemExist = await Item.findById(itemId);
        if (!isItemExist) {
          delete isOrderExist.orderItems[a];
        } else {
          payment += itemQty * isItemExist.price;
        }
      }
      await isOrderExist.save();

      if (payment > paying || payment < paying)
        return res.status(400).send({ message: 'please pay same' });
      return res.status(400).send({ message: 'thanks for pay', isOrderExist });
    }
  } catch (error) {
    return res
      .status(500)
      .send({ status: false, message: error.message, msg: 'server error' });
  }
};

module.exports = { payment };
