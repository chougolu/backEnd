const express = require('express');
const orderDetaiilsController = require('../controllers/orderDetailsController');
const router = express.Router();

router.post('/add-order-details',orderDetaiilsController.addOrderDetails);
router.get('/get-order-details',orderDetaiilsController.getOrderDetails);
router.get('/edit-order-details/:id',orderDetaiilsController.editOrderDetails);
router.patch('/update-order-details/:id',orderDetaiilsController.updateOrderDetails);
router.delete('/delete-order-details/:id',orderDetaiilsController.deleteOrderDetails);


module.exports = router;