module.exports = (sequelize, DataTypes) => {

    const FileUpload = sequelize.define('FileUpload', {
        // Model attributes are defined here
        image: {
            type: DataTypes.STRING
        }
    }, {
        tableName: 'uploads',
        updateAt: false
    });
    return FileUpload;
};