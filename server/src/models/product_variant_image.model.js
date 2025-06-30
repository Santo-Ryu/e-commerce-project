const {DataTypes} = require('sequelize')
const { sequelize } = require("../config/db");

const ProductVariantImage = sequelize.define('ProductVariantImage', {
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true
    }
}, {
    tableName: 'product_variant_images',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    freezeTableName: true
});

module.exports = ProductVariantImage