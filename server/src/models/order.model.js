const {DataTypes} = require('sequelize')
const { sequelize } = require("../config/db");
const User = require('./user.model');
const ShippingMethod = require('./shipping_method.model');
const OrderStatus = require('./order_status.model');

const Order = sequelize.define('Order', {
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true
    },
    user_id: {
        type: DataTypes.BIGINT
    },
    status_id: {
        type: DataTypes.BIGINT
    },
    shipping_method_id: {
        type: DataTypes.BIGINT
    },
    note: {
        type: DataTypes.STRING(255)
    },
    shipped_at: {
        type: DataTypes.DATE
    },
    delivered_at: {
        type: DataTypes.DATE
    },
    distance: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    total_price: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    tableName: 'orders',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    paranoid: true,
    deletedAt: 'deleted_at',
    freezeTableName: true
});

Order.belongsTo(User, {
    foreignKey: 'user_id',
    as: 'user'
});

Order.belongsTo(ShippingMethod, {
    foreignKey: 'shipping_method_id',
    as: 'shipping_method'
});

Order.belongsTo(OrderStatus, {
    foreignKey: 'status_id',
    as: 'order_status'
});

module.exports = Order