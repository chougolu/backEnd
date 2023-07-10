module.exports = (sequelize, DataTypes) => {

    const User = sequelize.define('User', {
        // Model attributes are defined here
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        firstName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        lastName: {
            type: DataTypes.STRING
        },
        telephone: {
            type: DataTypes.STRING,
            allowNull: false
        },
        profileImg:{
            type: DataTypes.STRING,
            allowNull: false
        },
        token:{
            type: DataTypes.STRING
        }
    }, {
        tableName: 'users',
        updateAt: false
    });
    console.log(User === sequelize.models.User); 
    return User;
};