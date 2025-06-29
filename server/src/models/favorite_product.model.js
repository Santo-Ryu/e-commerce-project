const {DataTypes} = require('sequelize');
const { sequelize } = require("../config/db");
const User = require('./user.model');
const Product = require('./product.model');

const FavoriteProduct = sequelize.define('FavoriteProduct', {
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true
    },
    user_id: {
        type: DataTypes.BIGINT
    },
    product_id: {
        type: DataTypes.BIGINT
    }
}, {
    tableName: 'favorite_products',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    freezeTableName: true
});

FavoriteProduct.belongsTo(User, {
   foreignKey: 'user_id',
   as: 'user' 
});

FavoriteProduct.belongsTo(Product, {
    foreignKey: 'product_id',
    as: 'product'
});

module.exports = FavoriteProduct