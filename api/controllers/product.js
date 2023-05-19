const mongoose = require("mongoose");
const Product = require("../models/productt");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString() + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  cb(null, false);
  cb(null, true);
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
});

const getProducts = async (req, res, next) => {
  try {
    const products = await Product.find({}, { _id: 0, __v: 0 }); // SELECT name, price FROM Product WHERE name = 'Biryani'
    if (products.length >= 0) {
      res.status(200).json(products);
    } else {
      res.status(404).json({
        message: "No products found.",
      });
    }
  } catch (error) {
    throw error;
  }
};

const createProduct = async (req, res, next) => {
  try {
    const product = new Product({
      _id: new mongoose.Types.ObjectId(),
      name: req.body.name,
      price: req.body.price,
    });
    const createProductResponse = await product.save();
    if (createProductResponse) {
      res.status(201).send(createProductResponse);
    } else {
      res.status(404).send({
        message: "Product not created.",
      });
    }
  } catch (error) {
    throw error;
  }
};

const getProduct = async (req, res, next) => {
  try {
    const id = req.params.productId;
    const getProductresponse = await Product.findById(id);
    if (getProductresponse) {
      res.status(200).json(getProductresponse);
    } else {
      res.status(404).json({ message: "No valid entry found for provided id" });
    }
  } catch (error) {
    throw error;
  }
};

const updateProduct = async (req, res, next) => {
  try {
    const id = req.params.productId;
    const productUpdate = await Product.updateOne(
      { _id: id },
      { $set: req.body }
    );
    if (productUpdate) {
      res.status(200).json(productUpdate);
    } else {
      res.status(404).json({ message: "Product not updated" });
    }
  } catch (error) {
    throw error;
  }
};

const deleteProduct = async (req, res, next) => {
  try {
    const id = req.params.productId;
    const deleteProduct = await Product.findOneAndRemove({ _id: id });
    if (deleteProduct) {
      res.status(200).send({
        message: "product deleted succesfully",
        deleteProduct,
      });
    }
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getProduct,
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
};
