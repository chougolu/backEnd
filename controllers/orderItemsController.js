const repository = require('../repository/orderItemsRepository');
const orderItemValSchema = require('../middlewares/validation/orderItemsValidation');

orderItemsController = {

    // Get order items.
    async getOrderItems(req, res) {
        const getOrderItemsData = await repository.getOrderItems(req);
        if (getOrderItemsData) {
            res.status(200).json({
                getOrderItemsData,
                success: true,
                status: 200
            });
        } else {
            res.status(200).json({
                'message': 'Data not found.',
                success: false,
                status: 400
            });
        }
    },

    // Add order items.
    async addOrderItems(req, res) {
        // Validate the request body against the schema
        const { error } = orderItemValSchema.validate(req.body);
        if (error) {
            // Return validation error message
            return res.status(400).json({ error: error.details[0].message });
        }
        const addOrderItemsData = await repository.addOrderItems(req);
        if (addOrderItemsData) {
            return res.status(200).json({
                'message': 'Order items added successfully.',
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

    // Edit order items
    async editOrderItems(req, res) {
        const editOrderItemsData = await repository.editOrderItems(req);
        if (editOrderItemsData) {
            return res.status(200).json({
                data: editOrderItemsData,
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

    // Update order items
    async updateOrderItems(req, res) {
        // Validate the request body against the schema
        const { error } = orderItemValSchema.validate(req.body);
        if (error) {
            // Return validation error message
            return res.status(400).json({ error: error.details[0].message });
        }
        const updateOrderItemsData = await repository.updateOrderItems(req);
        if (updateOrderItemsData == 1) {
            return res.status(200).json({
                'message': 'Order items updated successfully.',
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

    // Delete order items.
    async deleteOrderDetails(req, res) {
        const deleteOrderItemsData = await repository.deleteOrderItems(req);
        if (deleteOrderItemsData) {
            return res.status(200).json({
                'message': 'Order items deleted successfully.',
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

module.exports = orderItemsController;


