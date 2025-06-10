const {DataTypes} = require('sequelize')
const { sequelize } = require("../config/db");
const Seller = require('./seller.model');

const ProductAttribute = sequelize.define('ProductAttribute', {
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true
    },
    seller_id: {
        type: DataTypes.BIGINT,
        allowNull: false
    },
    attribute_name: {
        type: DataTypes.STRING(50),
        allowNull: false
    }
}, {
    tableName: 'product_attributes',
    timestamps: true,
    createdAt: 'created_at',
    freezeTableName: true
});

Category.belongsTo(Seller, {
    foreignKey: 'seller_id',
    as: 'seller'
});

module.exports = ProductAttribute