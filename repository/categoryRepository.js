const db = require('../models/index');
const Category = db.category;

categoryRepository = {

    // Add-category
    async addCategoryRep(req) {
        const categoryRes = await Category.create({
            name: req.body.name,
            description: req.body.description
        });
        return categoryRes;
    },

    // Find one category
    async findOneCategory(req) {
        const findOneCategoryRes = await Category.findOne({
            where: {
                name: req.body.name
            }
        });
        return findOneCategoryRes
    },

    // Find all categories
    async findAllCategory() {
        const findCategoryData = await Category.findAll({});
        return findCategoryData;
    },

    // Find single category for edit
    async findSingleCategory(req) {
        const findOneCategoryData = await Category.findOne({
            where: {
                id: req.params.id
            }
        });
        return findOneCategoryData
    },

    // Update category
    async updateCategory(req) {
        const categoryUpdatedData = await Category.update(req.body, {
            where: {
                id: req.params.id
            }
        });
        return categoryUpdatedData;
    },

    // Delete category
    async deleteCategoryData(req) {
        const deleteRes = Category.destroy({
            where: {
                id: req.params.id
            }
        });
        return deleteRes;
    }
}

module.exports = categoryRepository;