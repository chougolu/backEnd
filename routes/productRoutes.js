const express = require('express');
const ProductController = require('../controllers/ProductController');
const upload = require('../middlewares/productImgMiddleware');
const router = express.Router();

router.get('/product-category', ProductController.productCategory);
router.post('/add-product', upload, ProductController.addProduct);
router.get('/get-products', ProductController.getProduct);
router.get('/edit-product/:id', ProductController.editProduct);
router.patch('/update-product/:id',upload, ProductController.updateProduct);
router.delete('/delete-product/:id', ProductController.deleteProduct);


module.exports = router;