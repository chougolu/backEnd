const db = require('../models/index');
const OrderDetails = db.orderDetails;
const User = db.user;

orderDetailsRepository = {

    // Add order details
    async addOrderDetails(req) {
        const addOrderDetailsData = OrderDetails.create({
            user_id: req.body.user_id,
            total: req.body.total,
            payment_id: req.body.payment_id
        });
        return addOrderDetailsData;
    },

    // Edit order details
    async editOrderDetail(req){
        const editOrderDetailsData = await OrderDetails.findOne({
            where: {
                id: req.params.id
            }
        });
        return editOrderDetailsData;
    },

    // Update order detail
    async updateOrderDetail(req){
        const updateOrderDetailsData = await OrderDetails.update(req.body, {
            where: {
                id: req.params.id
            }
        });
        return updateOrderDetailsData;
    },

    // Delete order detail
    async deleteOrderDetail(req){
        const deleteOrderDetailsData = await OrderDetails.destroy({
            where: {
                id: req.params.id
            }
        });
        return deleteOrderDetailsData;
    },

    // Get all oreder details
    async getOrderDetails(){
        const getOrderDetailsData = await OrderDetails.findAll({
            include: [{
                model: User,
                attributes: ["email", "firstName", "lastName", "telephone"]
            }]
        })
        return getOrderDetailsData;
    }
}

module.exports = orderDetailsRepository;