const {DataTypes} = require('sequelize')
const { sequelize } = require("../config/db");
const ProductVariant = require('./product_variant.model');
const ProductAttributeValue = require('./product_attribute_value.model');

const ProductVariantAttribute = sequelize.define('ProductVariantAttribute', {
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true
    },
    product_variant_id: {
        type: DataTypes.BIGINT,
        allowNull: false
    },
    attribute_value_id: {
        type: DataTypes.BIGINT,
        allowNull: false
    }
}, {
    tableName: 'product_variant_attributes',
    timestamps: true,
    freezeTableName: true
});

ProductVariantAttribute.belongsTo(ProductVariant, {
    foreignKey: 'product_variant_id',
    as: 'product_variant'
});

ProductVariantAttribute.belongsTo(ProductAttributeValue, {
    foreignKey: 'attribute_value_id',
    as: 'attribute_value'
});

module.exports = ProductVariantAttribute