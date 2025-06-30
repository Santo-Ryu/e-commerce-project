const { DataTypes } = require('sequelize');
const { sequelize } = require("../config/db");
const CommissionSetting = require('./commission_setting.model');

const CommissionHistory = sequelize.define('CommissionHistory', {
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true
    },
    brand_id: {
        type: DataTypes.BIGINT
    },
    order_id: {
        type: DataTypes.BIGINT
    },
    total_amount: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    commission_setting_id: {
        type: DataTypes.BIGINT,
        allowNull: false
    },
    seller_receive_amount: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    admin_receive_amount: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
}, {
    tableName: 'commission_history',
    timestamps: true,
    createdAt: 'created_at',
    freezeTableName: true
});

CommissionHistory.belongsTo(CommissionSetting, {
    foreignKey: 'commission_setting_id',
    as: 'commission_setting'
});

module.exports = CommissionHistory