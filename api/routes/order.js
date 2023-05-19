const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');
// controllers
const{getOrders, createOrder, deleteOrder, updateOrder} = require('../controllers/order');

router.get('/',checkAuth, getOrders );

router.post('/',checkAuth, createOrder );

router.delete('/:orderId', checkAuth, deleteOrder);

router.patch('/:orderId',checkAuth, updateOrder );




module.exports = router;