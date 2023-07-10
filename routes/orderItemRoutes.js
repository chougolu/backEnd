const express = require('express');
const orderItemsController = require('../controllers/orderItemsController');
const router = express.Router();

router.post('/add-order-items',orderItemsController.addOrderItems);
router.get('/get-order-items',orderItemsController.getOrderItems);
router.get('/edit-order-items/:id',orderItemsController.editOrderItems);
router.patch('/update-order-items/:id',orderItemsController.updateOrderItems);
router.delete('/delete-order-items/:id',orderItemsController.deleteOrderDetails);

module.exports = router;