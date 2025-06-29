const {DataTypes} = require('sequelize');
const { sequelize } = require("../config/db");
const User = require('./user.model');

const ActivityLog = sequelize.define('ActivityLog', {
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true
    },
    user_id: {
        type: DataTypes.BIGINT
    },
    action: {
        type: DataTypes.STRING(100), 
        allowNull: fasle
    },
    description: {
        type: DataTypes.TEXT
    }
}, {
    tableName: 'activity_logs',
    timestamps: true,
    createdAt: 'created_at',
    freezeTableName: true
});

ActivityLog.belongsTo(User, {
    foreignKey: 'user_id',
    as: 'user'
});

module.exports = ActivityLog