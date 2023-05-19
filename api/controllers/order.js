const Order = require("../models/orderr");
const Product = require("../models/productt");
const mongoose = require("mongoose");
const { findByIdAndDelete } = require("../models/productt");

const getOrders = async (req, res, next) => {
  try {
    const getOrderresponse = await Order.find({}, {}); //select('product quantity _id').populate('product', 'Name')
    if (getOrderresponse) {
      res.status(200).json(getOrderresponse);
    } else {
      res.status(404).json("order not found");
    }
  } catch (error) {
    throw error;
  }
};

const createOrder = async (req, res, next) => {
  try {
    const { orders } = req.body; //destructring
    //map opeartion only works on array
    let ordersWithName = orders.map(async (order) => {
      const { name } = await Product.findOne(
        { _id: order.productId },
        { _id: 0, name: 1 }
      );
      if (!name) {
        return res.status(404).send({
          error: true,
          message: `Invalid productId ${order.productId}`,
        });
      } else {
        return {
          ...order,
          name,
        };
      }
    });
    ordersWithName = await Promise.all(ordersWithName);
    const order = await new Order({
      _id: new mongoose.Types.ObjectId(),
      orders: ordersWithName,
    });

    const createOrderres = await order.save();
    if (createOrderres) {
      res.status(201).json(createOrderres);
    } else {
      res.status(404).json("Order not created.");
    }
  } catch (error) {
    throw error;
  }
};

const deleteOrder = async (req, res, next) => {
  try {
    const id = req.params.orderId;
    const deleteorderres = await Order.findOneAndRemove({ _id: id });
    if (deleteorderres) {
      res
        .status(200)
        .json(console.log("product deleted succesfully", deleteorderres));
    }
  } catch (error) {
    throw error;
  }
};

const updateOrder = async (req, res, next) => {
  try {
    const id = req.params.orderId;
    const orderUpdate = await Order.updateOne({ _id: id }, { $set: req.body });
    if (orderUpdate) {
      res.status(200).json(orderUpdate);
    } else {
      res.status(404).json({ message: "order not updated" });
    }
  } catch (error) {
    throw error;
  }
};

module.exports = { getOrders, createOrder, deleteOrder, updateOrder };
