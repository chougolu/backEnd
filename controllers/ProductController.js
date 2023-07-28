const repository = require('../repository/productRepository');
const productValSchema = require('../middlewares/validation/productValidation');

ProductController = {
    // Find all category.
    async productCategory(req, res) {
        const getProductCategoryData = await repository.getProductCategory(req);
        if (getProductCategoryData) {
            return res.json({
                productCategoryData: getProductCategoryData,
                success: true,
                status: (200)
            });
        } else {
            return res.json({
                "message": "Product category not found.",
                success: false,
                status: 400
            });
        }
    },

    // Add product.
    async addProduct(req, res) {
        // Validate the request body against the schema
        const { error } = productValSchema.validate(req.body);
        if (error) {
            // Return validation error message
            return res.status(400).json({ message: error.details[0].message });
        }
        const addProductData = await repository.addProductData(req);
        if (addProductData) {
            return res.status(200).json({
                'message': 'Product added successfully.',
                success: true,
                status: 200
            });
        } else {
            return res.status(400).json({
                'message': 'Something went wrong.',
                success: false,
                status: 400
            });
        }
    },

    // Get all products.
    async getProduct(req, res) {
        const allProductsData = await repository.getAllProduct(req);
        if (allProductsData) {
            res.json({
                allProductsData,
                success: true,
                status: 200
            });
        } else {
            res.json({
                "message": "Product data not found.",
                success: false,
                status: 404
            });
        }
    },

    // Get products by category
    async getProductByCategory(req, res) {
        const findProductByCategoryData = await repository.findProductByCategory(req);
        if (findProductByCategoryData.length > 0) {
            return res.json({
                findProductByCategoryData,
                success: true,
                status: 200
            });
        } else {
            return res.json({
                "message": "Product not found.",
                success: false,
                status: 404
            });
        }

    },

    // Edit product.
    async editProduct(req, res) {
        const editProductData = await repository.editProduct(req);
        if (editProductData) {
            return res.json({
                editProductData,
                success: true,
                status: 200
            });
        } else {
            return res.json({
                "message": "Product not found.",
                success: false,
                status: 404
            });
        }
    },

    // Update product.
    async updateProduct(req, res) {

        // Validate the request body against the schema
        const { error } = productValSchema.validate({
            product_category_id: req.body.product_category_id,
            name: req.body.name,
            description: req.body.description,
            SKU: req.body.SKU,
            price: req.body.price,
        });
        if (error) {
            // Return validation error message
            return res.status(400).json({ message: error.details[0].message });
        }

        const updateProductData = await repository.updateProduct(req);
        if (updateProductData == 1) {
            return res.status(200).json({
                'message': 'Product updated successfully.',
                success: true,
                status: 200
            });
        } else {
            return res.json({
                'message': 'Something went wrong.',
                success: false,
                status: 400
            });
        }
    },

    // Delete product.
    async deleteProduct(req, res) {
        const deleteProductData = await repository.deleteProduct(req);
        if (deleteProductData) {
            return res.status(200).json({
                'message': 'Product deleted successfully.',
                success: true,
                status: 200
            });
        } else {
            return res.status(400).json({
                'message': 'Something went wrong.',
                success: false,
                status: 400
            });
        }
    }
}

module.exports = ProductController;
