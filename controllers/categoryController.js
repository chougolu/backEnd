const repository = require('../repository/categoryRepository')
const categoryValSchema = require('../middlewares/validation/categoryValidation');
const db = require('../models/index');
const Category = db.category;

categoryController = {

    // Add category.
    async addCategory(req, res) {
        // Validate the request body against the schema
        const { error } = categoryValSchema.validate(req.body);
        if (error) {
            // Return validation error message
            return res.status(400).json({ message: error.details[0].message });
        }
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
                return res.status(200).json({
                    "message": "Something went wrong.",
                    success: false,
                    status: 200
                });
            }
        }
    },

    // Find all category
    async getAllCategory(req, res) {

        const page = req.query.page ? parseInt(req.query.page) : 1;
        const limit = req.query.limit ? parseInt(req.query.limit) : 5;
        const skip = (page - 1) * limit;

        const findCategories = await repository.findAllCategory(limit, skip);
        const totalRecord = await Category.count({});
        if (findCategories) {
            return res.status(200).json({
                allCategoryData: findCategories,
                totalRecord,
                limit,
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

        // Category update code
        const categoryUpdateData = async () => {
            // Validate the request body against the schema
            const { error } = categoryValSchema.validate(req.body);
            if (error) {
                // Return validation error message
                return res.status(400).json({ message: error.details[0].message });
            }
            const categoryData = await repository.updateCategory(req);
            if (categoryData == 1) {
                return res.status(200).json({
                    "message": "Category updated successfully.",
                    success: true,
                    status: 200
                });
            } else {
                return res.status(200).json({
                    "message": "Something went wrong.",
                    success: false,
                    status: 200
                });
            }
        }
        const singleCategoryData = await repository.findSingleCategory(req);
        const categoryFindData = await repository.categoryFindByCategoryName(req);
        if (categoryFindData == null) {
            categoryUpdateData();
        } else if (categoryFindData.name == singleCategoryData.name) {
            categoryUpdateData();
        } else {
            res.status(400).json({
                "message": "This category is already exists.",
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
        }
    }
}

module.exports = categoryController;