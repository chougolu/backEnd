const repository = require('../repository/orderDetailsRepository');

orderDetaiilsController = {

    // Get all order details.
    async getOrderDetails(req, res) {
        const getOrderDetailsData = await repository.getOrderDetails(req);
        res.status(200).json({
            getOrderDetailsData,
            success: true,
            status: 200
        });
    },

    // Add order details.
    async addOrderDetails(req, res) {
        const addOrderDetailsData = await repository.addOrderDetails(req);
        if (addOrderDetailsData) {
            return res.status(200).json({
                'message': 'Order details added successfully.',
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

    // Edit order details
    async editOrderDetails(req, res) {
        const editOrderDetailsData = await repository.editOrderDetail(req);
        if (editOrderDetailsData) {
            return res.status(200).json({
                data: editOrderDetailsData,
                status: 200
            });
        } else {
            return res.status(400).json({
                'message': 'Data not found.',
                status: 400
            });
        }
    },

    // Update order details
    async updateOrderDetails(req, res) {
        const updateOrderDetailsData = await repository.updateOrderDetail(req);
        if (updateOrderDetailsData) {
            return res.status(200).json({
                'message': 'Order details updated successfully.',
                success: true,
                status: 200
            });
        } else {
            return res.status(400).json({
                'message': 'Something went wrong.',
                status: 400
            });
        }
    },

    // Delete order detail.
    async deleteOrderDetails(req, res) {
        const deleteOrderDetailsData = await repository.deleteOrderDetail(req);
        if (deleteOrderDetailsData) {
            return res.status(200).json({
                'message': 'Order details deleted successfully.',
                success: true,
                status: 200
            });
        } else {
            return res.status(400).json({
                'message': 'Something went wrong.',
                status: 400
            });
        }
    }
}

module.exports = orderDetaiilsController;