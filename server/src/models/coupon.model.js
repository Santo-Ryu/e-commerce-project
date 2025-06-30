const {DataTypes} = require('sequelize');
const { sequelize } = require("../config/db");
const Brand = require('./brand.model');

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
    type: {
        type: DataTypes.ENUM('brand', 'admin'),
        allowNull: false
    },
    brand_id: {
        type: DataTypes.BIGINT,
        allowNull: true,
        defaultValue: null
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

Coupon.belongsTo(Brand, {
    foreignKey: 'brand_id',
    as: 'brand'
});

module.exports = Coupon