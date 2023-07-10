module.exports = (sequelize, DataTypes) => {

    const OrderDetails = sequelize.define('OrderDetails', {
        // Model attributes are defined here
        user_id: {
            type: DataTypes.INTEGER
        },
        total: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        payment_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {
        tableName: 'order_details',
        updateAt: false
    });
    return OrderDetails;
};