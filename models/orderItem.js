module.exports = (sequelize, DataTypes) => {

    const OrderItems = sequelize.define('OrderItems', {
        // Model attributes are defined here
        order_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        product_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {
        tableName: 'order_items',
        updateAt: false
    });
    return OrderItems;
};