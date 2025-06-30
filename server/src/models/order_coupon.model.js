const {DataTypes} = require('sequelize');
const { sequelize } = require("../config/db");
const Order = require('./order.model');
const Coupon = require('./coupon.model');

const OrderCoupon = sequelize.define('OrderCoupon', {
    order_id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        allowNull: false
    },
    coupon_id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        allowNull: false
    }
}, {
    tableName: 'order_coupons',
    freezeTableName: true
});

OrderCoupon.belongsTo(Order, {
    foreignKey: 'order_id',
    as: 'order'
});

OrderCoupon.belongsTo(Coupon, {
    foreignKey: 'coupon_id',
    as: 'coupon'
});

module.exports = OrderCoupon