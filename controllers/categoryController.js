const repository = require('../repository/categoryRepository')

categoryController = {

    // Add category.
    async addCategory(req, res) {
        const findOneCategory = await repository.findOneCategory(req);
        if (findOneCategory) {
            return res.status(400).json({
                "message": "This category is already exists.",
                success: false,
                status: 400
            });
        } else {
            const addCategory = await repository.addCategoryRep(req);
            if (addCategory) {
                return res.status(200).json({
                    "message": "Category created successfully.",
                    success: true,
                    status: 200
                });
            } else {
                return res.status(400).json({
                    "message": "Something went wrong.",
                    success: false,
                    status: 400
                });
            }
        }
    },

    // Find all category
    async getAllCategory(req, res) {
        const findCategories = await repository.findAllCategory();
        if (findCategories) {
            return res.status(200).json({
                allCategoryData: findCategories,
                success: true,
                status: 200
            });
        } else {
            return res.status(400).json({
                "message": "Category data not found.",
                success: false,
                status: 400
            });
        }
    },

    //Get category data for edit.
    async editCategory(req, res) {
        const singleCategoryData = await repository.findSingleCategory(req);
        if (singleCategoryData) {
            return res.status(200).json({
                singleCategoryData,
                success: true,
                status: 200
            });
        } else {
            return res.status(400).json({
                "message": "Category data not found.",
                success: false,
                status: 400
            });
        }
    },

    // Update category.
    async updatetCategory(req, res) {
        const categoryData = await repository.updateCategory(req);
        if (categoryData == 1) {
            return res.status(200).json({
                "message": "Category updated successfully.",
                success: true,
                status: 200
            });
        } else {
            return res.status(400).json({
                "message": "Something went wrong.",
                success: false,
                status: 400
            });
        }
    },

    // Delete category.
    async deleteCategory(req, res) {
        const deleteRes = await repository.deleteCategoryData(req)
        if (deleteRes) {
            return res.status(200).json({
                "message": "Category deleted successfully.",
                success: true,
                status: 200
            });
        } else {
            res.status(400).json({
                "message": "Something went wrong.",
                success: false,
                status: 400
            });
        }
    }
}

module.exports = categoryController;