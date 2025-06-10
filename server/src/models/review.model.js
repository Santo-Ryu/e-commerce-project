const {DataTypes} = require('sequelize');
const { sequelize } = require("../config/db");
const Product = require('./product.model');

const Review = sequelize.define('Review', {
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true
    },
    product_id: {
        type: DataTypes.BIGINT,
        allowNull: false
    },
    user_id: {
        type: DataTypes.BIGINT
    },
    rating: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    review_text: {
        type: DataTypes.TEXT,
        allowNull: false
    }
}, {
    tableName: 'reviews',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    freezeTableName: true
});

Review.belongsTo(Product, {
    foreignKey: 'product_id',
    as: 'product'
});

Review.belongsTo(Product, {
    foreignKey: 'user_id',
    as: 'user'
});

module.exports = Review