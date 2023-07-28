const express = require('express');
const ProductController = require('../controllers/ProductController');
const productImgUpload = require('../middlewares/imageUploads/productImgMiddleware');
const router = express.Router();

router.get('/product-category', ProductController.productCategory);
router.post('/add-product', productImgUpload, ProductController.addProduct);
router.get('/get-products', ProductController.getProduct);
router.get('/get-products-by-category/:id', ProductController.getProductByCategory);
router.get('/edit-product/:id', ProductController.editProduct);
router.patch('/update-product/:id', productImgUpload, ProductController.updateProduct);
router.delete('/delete-product/:id', ProductController.deleteProduct);


module.exports = router;