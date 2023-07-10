module.exports = (sequelize, DataTypes) => {

    const Category = sequelize.define('Category', {
        // Model attributes are defined here
        name: {
            type: DataTypes.STRING
        },
        description: {
            type: DataTypes.STRING
        }
    }, {
        // Other model options go here
        tableName: 'categories',
        updateAt: false
    });

    // `sequelize.define` also returns the model
    // console.log(User === sequelize.models.User); // true
    return Category;
};