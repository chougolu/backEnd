const db = require('../models/index');
const Product = db.product;
const Category = db.category;

productRepository = {

    // Get product category
    async getProductCategory() {
        const getProductCategoryData = await Category.findAll({});
        return getProductCategoryData;
    },

    // Add category
    async addProductData(req) {
        const addProductData = await Product.create({
            product_category_id: req.body.product_category_id,
            name: req.body.name,
            description: req.body.description,
            SKU: req.body.SKU,
            price: req.body.price,
            productImg: req.file.filename
        });
        return addProductData;
    },

    // Get all products
    async getAllProduct() {
        const allProductsData = await Product.findAll({});
        return allProductsData;
    },

    // Find product by category
    async findProductByCategory(req) {
        const findProductByCategoryData = await Product.findAll({
            where: {
                product_category_id: req.params.id
            }
        });
        return findProductByCategoryData;
    },

    // Edit product data
    async editProduct(req) {
        const editProductData = await Product.findOne({
            where: {
                id: req.params.id
            }
        });
        return editProductData;
    },

    // Update product data
    async updateProduct(req) {

        const updateData = {
            product_category_id: req.body.product_category_id,
            name: req.body.name,
            description: req.body.description,
            SKU: req.body.SKU,
            price: req.body.price,
        };

        // Check if req.file exists and has the filename property
        if (req.file && req.file.filename) {
            updateData.productImg = req.file.filename
        }

        const options = {
            where: {
                id: req.params.id
            }
        };

        const updateProductData = await Product.update(updateData, options);
        return updateProductData;
    },

    // Delete product data
    async deleteProduct(req) {
        const deleteProductData = Product.destroy({
            where: {
                id: req.params.id
            }
        });
        return deleteProductData;
    }
}

module.exports = productRepository;