const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
      trim: true,
    },
    orderItems: [
      {
        id: mongoose.Schema.Types.ObjectId,
        qty: {
          type: Number,
          default: 1,
        },
        _id: 0,
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model('orderSchema', orderSchema);
