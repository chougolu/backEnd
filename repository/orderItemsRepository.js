const db = require('../models/index');
const OrderItems = db.orderItems;
const Product = db.product;
const OrderDetails = db.orderDetails;

orderItemsRepository = {

    // Add order ittems
    async addOrderItems(req) {
        const addOrderItemsData = await OrderItems.create({
            order_id: req.body.order_id,
            product_id: req.body.product_id,
            quantity: req.body.quantity
        });
        return addOrderItemsData;
    },

    // Edit order items
    async editOrderItems(req) {
        const editOrderItemsData = await OrderItems.findOne({
            where: {
                id: req.params.id
            }
        });
        return editOrderItemsData;
    },

    // Update order items
    async updateOrderItems(req) {
        const updateOrderItemsData = await OrderItems.update(req.body, {
            where: {
                id: req.params.id
            }
        });
        return updateOrderItemsData;
    },

    // Get all order items
    async getOrderItems(req) {
        const getOrderItemsData = await OrderItems.findAll({
            include: [{
                model: Product,
                attributes: ["name", "description", "SKU", "price"]
            },
            {
                model: OrderDetails,
                attributes: ["user_id", "total", "payment_id"]
            }]
        });
        return getOrderItemsData;
    },

    // Delete order items
    async deleteOrderItems(req) {
        const deleteOrderItemsData = await OrderItems.destroy({
            where: {
                id: req.params.id
            }
        });
        return deleteOrderItemsData;
    }
}

module.exports = orderItemsRepository;