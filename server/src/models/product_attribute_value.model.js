const {DataTypes} = require('sequelize')
const { sequelize } = require("../config/db");
const ProductAttribute = require('./product_attribute.model');

const ProductAttributeValue = sequelize.define('ProductAttributeValue', {
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true
    },
    attribute_id: {
        type: DataTypes.BIGINT,
        allowNull: false
    },
    value: {
        type: DataTypes.STRING(50),
        allowNull: false
    }
}, {
    tableName: 'product_attribute_values',
    freezeTableName: true
});

ProductAttributeValue.belongsTo(ProductAttribute, {
    foreignKey: 'attribute_id',
    as: 'attribute'
});

module.exports = ProductAttributeValue