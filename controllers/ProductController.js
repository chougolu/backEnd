const repository = require('../repository/productRepository');


ProductController = {

    // Find all category.
    async productCategory(req, res) {
        const getProductCategoryData = await repository.getProductCategory(req);
        if (getProductCategoryData) {
            return res.json({
                productCategoryData: getProductCategoryData,
                success:true,
                status:(200)
            });
        } else {
            return res.json({
                "message": "Product category not found.",
                success:false,
                status:400
            })
        }
    },

    // Add product.
    async addProduct(req, res) {
        const addProductData = await repository.addProductData(req);
        if (addProductData) {
            return res.status(200).json({
                'message': 'Product added successfully.',
                success: true,
                status: 200
            })
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
        const editProductData = await repository.getAllProduct(req);
        if (editProductData) {
            res.json({
                editProductData,
                success: true,
                status: 200
            });
        } else {
            res.json({
                "message": "Product data not found.",
                success: false,
                status: 404
            })
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
            })
        } else {
            return res.json({
                "message": "Product not found.",
                success: false,
                status: 404
            })
        }
    },

    // Update product.
    async updateProduct(req, res) {
        const updateProductData = await repository.updateProduct(req);
        if (updateProductData == 1) {
            return res.status(200).json({
                'message': 'Product updated successfully.',
                success: true,
                status: 200
            })
        } else {
            return res.status(400).json({
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
            })
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
