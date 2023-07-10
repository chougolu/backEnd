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
            productImg: req.file.path
        });
        return addProductData;
    },

    // Get all products
    async getAllProduct() {
        const allProductsData = await Product.findAll({});
        return allProductsData;
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
        const updateProductData = await Product.update(
            {
                product_category_id: req.body.product_category_id,
                name: req.body.name,
                description: req.body.description,
                SKU: req.body.SKU,
                price: req.body.price,
                productImg: req.file.path
            },
            {
                where: {
                    id: req.params.id
                }
            });
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