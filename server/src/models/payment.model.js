const {DataTypes} = require('sequelize')
const { sequelize } = require("../config/db");
const Order = require('./order.model');

const Payment = sequelize.define('Payment', {
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true
    },
    order_id: {
        type: DataTypes.BIGINT,
        allowNull: false
    },
    method: {
        type: DataTypes.ENUM('cod', 'qr'),
        allowNull: false
    },
    status: {
        type: DataTypes.ENUM('pending', 'completed', 'failed', 'refunded'),
        allowNull: false,
        defaultValue: 'pending'
    },
    paid_at: {
        type: DataTypes.DATE,
        defaultValue: null
    }
}, {
    tableName: 'payments',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    freezeTableName: true
});

Payment.belongsTo(Order, {
    foreignKey: 'order_id',
    as: 'order'
});

module.exports = Payment