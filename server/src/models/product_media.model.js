const {DataTypes, ENUM} = require('sequelize')
const { sequelize } = require("../config/db");
const Product = require('./product.model');

const ProductMedia = sequelize.define('ProductMedia', {
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true
    },
    media_type: {
        type: DataTypes.ENUM('image', 'video')
    },
    is_featured: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    product_id: {
        type: DataTypes.BIGINT,
        allowNull: false
    }
}, {
    tableName: 'product_media',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    freezeTableName: true
});

ProductMedia.belongsTo(Product, {
    foreignKey: 'product_id',
    as: 'product'
});

module.exports = ProductMedia