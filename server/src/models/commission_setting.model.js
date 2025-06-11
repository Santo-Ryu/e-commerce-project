const { DataTypes, Sequelize } = require('sequelize');
const { sequelize } = require("../config/db");
const Brand = require('./brand.model');

const CommissionSetting = sequelize.define('CommissionSetting', {
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true
    },
    brand_id: {
        type: DataTypes.BIGINT,
        allowNull: true
    },
    commission_percent: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    effective_from: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.NOW
    }
}, {
    tableName: 'commission_settings',
    timestamps: true,
    createdAt: 'created_at',
    freezeTableName: true
});

CommissionSetting.belongsTo(Brand, {
    foreignKey: 'brand_id',
    as: 'brand'
});

module.exports = CommissionSetting