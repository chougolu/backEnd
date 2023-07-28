module.exports = (sequelize, DataTypes) => {

    const UserAddress = sequelize.define('UserAddress', {
        // Model attributes are defined here
        userId: {
            type: DataTypes.INTEGER
        },
        address_line_1: {
            type: DataTypes.STRING
        },
        address_line_2: {
            type: DataTypes.STRING
        },
        city: {
            type: DataTypes.STRING,
            allowNull: false
        },
        postal_code: {
            type: DataTypes.INTEGER
        },
        country: {
            type: DataTypes.STRING
        },
        mobile: {
            type: DataTypes.STRING
        }
    }, {
        tableName: 'useraddress'
    });
    return UserAddress;
};