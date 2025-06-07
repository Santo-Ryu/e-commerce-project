const {DataTypes} = require('sequelize');
const sequelize = require('../config/db');

const Coupon = sequelize.define('Coupon', {
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true
    },
    code: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true
    },
    discount_percent: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    max_uses: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    used_count: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    expired_at: {
        type: DataTypes.DATE,
        allowNull: false
    }
}, {
    tableName: 'coupons',
    timestamps: true,
    createdAt: 'created_at',
    freezeTableName: true
});

module.exports = Coupon