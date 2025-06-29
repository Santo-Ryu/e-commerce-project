const {DataTypes} = require('sequelize');
const { sequelize } = require("../config/db");
const Order = require('./order.model');

const ReturnRequest = sequelize.define('ReturnRequest', {
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true
    },
    order_item_id: {
        type: DataTypes.BIGINT,
        allowNull: false
    },
    reason: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    return_type: {
        type: DataTypes.ENUM('refund', 'exchange'),
        allowNull: false,
        defaultValue: 'refund'
    },
    status: {
        type: DataTypes.ENUM('pending', 'approved', 'rejected'),
        defaultValue: 'pending'
    }
}, {
    tableName: 'return_requests',
    timestamps: true,
    createdAt: 'created_at',
    freezeTableName: true
});

ReturnRequest.belongsTo(Order, {
    foreignKey: 'order_item_id',
    as: 'order_item'
});

module.exports = ReturnRequest