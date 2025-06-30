const {DataTypes} = require('sequelize')
const { sequelize } = require("../config/db");
const Order = require('./order.model');
const Product = require('./product.model');

const OrderItem = sequelize.define('OrderItem', {
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true
    },
    order_id: {
        type: DataTypes.BIGINT,
        allowNull: false
    },
    product_id: {
        type: DataTypes.BIGINT,
        allowNull: false
    },
    product_name: {
        type: DataTypes.STRING(255)
    },
    price: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    discount_percent: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    return_status: {
        type: DataTypes.ENUM('not_requested', 'requested', 'approved', 'rejected', 'returned'),
        defaultValue: 'not_requested'
    },
    final_total: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    tableName: 'order_items',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    freezeTableName: true
});

OrderItem.belongsTo(Order, {
    foreignKey: 'order_id',
    as: 'order'
});

OrderItem.belongsTo(Product, {
    foreignKey: 'product_id',
    as: 'product'
});

module.exports = OrderItem