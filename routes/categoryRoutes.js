const express = require('express');
const categoryController = require('../controllers/categoryController');
const router = express.Router();

router.post('/category-add',categoryController.addCategory);
router.get('/category',categoryController.getAllCategory);
router.get('/category-edit/:id',categoryController.editCategory);
router.patch('/category-update/:id',categoryController.updatetCategory);
router.delete('/category-delete/:id',categoryController.deleteCategory);

module.exports = router;