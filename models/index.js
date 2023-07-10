const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize('sequelize_api', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    logging: false,
    pool: {
        max: 5,
        min: 0,
        idle: 10000
    }
});

try {
    sequelize.authenticate();
    console.log('Connection has been established successfully.');
} catch (error) {
    console.error('Unable to connect to the database:', error);
}

const db = {};
db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.user = require('./User')(sequelize, DataTypes);
db.useraddress = require('./userAdderss')(sequelize, DataTypes);
db.category = require('./category')(sequelize, DataTypes);
db.product = require('./product')(sequelize, DataTypes);
db.orderDetails = require('./orderDetails')(sequelize, DataTypes);
db.orderItems = require('./orderItem')(sequelize, DataTypes);
db.FileUpload = require('./fileUpload')(sequelize, DataTypes);

//one-To-one
db.user.hasOne(db.orderDetails,{foreignKey: 'user_id'});
db.orderDetails.belongsTo(db.user,{foreignKey: 'user_id'});

db.orderDetails.hasOne(db.orderItems,{foreignKey: 'order_id'});
db.orderItems.belongsTo(db.orderDetails,{foreignKey: 'order_id'});

db.product.hasOne(db.orderItems,{foreignKey: 'product_id'});
db.orderItems.belongsTo(db.product,{foreignKey: 'product_id'});

db.sequelize.sync({ force: false });

module.exports = db;