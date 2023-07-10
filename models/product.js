module.exports = (sequelize, DataTypes) => {

    const Product = sequelize.define('Product', {
        // Model attributes are defined here
        product_category_id: {
            type: DataTypes.STRING
        },
        name: {
            type: DataTypes.STRING,
            validate: {
                isAlpha: true,
                notEmpty: true 
              }
        },
        description: {
            type: DataTypes.STRING
        },
        SKU: {
            type: DataTypes.INTEGER
        },
        price: {
            type: DataTypes.INTEGER
        },
        productImg: {
            type: DataTypes.STRING
        }
    }, {
        tableName: 'products',
        updateAt: false
    });
    return Product;
};