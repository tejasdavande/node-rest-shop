const express = require("express");
const router = express.Router();
// Middlewares
const checkAuth = require("../middleware/check-auth");
// Controllers
const {
  getProduct,
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/product");
// Routes
router.get("/", checkAuth, getProducts);
router.get("/:productId", getProduct);
router.post("/", createProduct);
router.patch("/:productId", checkAuth, updateProduct);
router.delete("/:productId", checkAuth, deleteProduct);

module.exports = router;
