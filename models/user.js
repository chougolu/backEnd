module.exports = (sequelize, DataTypes) => {

    const User = sequelize.define('User', {
        // Model attributes are defined here
        email: {
            type: DataTypes.STRING,
        },
        password: {
            type: DataTypes.STRING,
        },
        firstName: {
            type: DataTypes.STRING,
        },
        lastName: {
            type: DataTypes.STRING
        },
        telephone: {
            type: DataTypes.STRING,
        },
        profileImg:{
            type: DataTypes.STRING,
        }
    }, {
        tableName: 'users',
        updateAt: false
    });
    console.log(User === sequelize.models.User); 
    return User;
};