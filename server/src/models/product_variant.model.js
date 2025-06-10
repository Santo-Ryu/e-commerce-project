const {DataTypes} = require('sequelize')
const { sequelize } = require("../config/db");
const Product = require('./product.model');
const ProductVariantImage = require('./product_variant_image.model');

const ProductVariant = sequelize.define('ProductVariant', {
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true
    },
    product_id: {
        type: DataTypes.BIGINT,
        allowNull: false
    },
    price: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    stock: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    weight: {
        type: DataTypes.DECIMAL(5,2),
        defaultValue: null
    },
    dimensions: {
        type: DataTypes.STRING(100),
        defaultValue: null
    },
    active: {
        type: DataTypes.ENUM('selling', 'out_of_stock', 'stopped'),
        allowNull: false,
        defaultValue: 'selling'
    },
    image_id: {
        type: DataTypes.BIGINT,
        allowNull: false
    }
}, {
    tableName: 'product_variants',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    freezeTableName: true
});

ProductVariant.belongsTo(Product, {
    foreignKey: 'product_id',
    as: 'product'
});

ProductVariant.belongsTo(ProductVariantImage, {
    foreignKey: 'image_id',
    as: 'image'  
});

module.exports = ProductVariant