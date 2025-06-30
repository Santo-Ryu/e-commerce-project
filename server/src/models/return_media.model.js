const {DataTypes} = require('sequelize');
const { sequelize } = require("../config/db");
const ReturnRequest = require('./return_request.model');

const ReturnMedia = sequelize.define('ReturnMedia', {
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    return_request_id: {
        type: DataTypes.BIGINT,
        allowNull: false
    },
    media_type: {
        type: DataTypes.ENUM('image', 'video'),
        allowNull: false
    }
}, {
    tableName: 'return_media',
    timestamps: true,
    createdAt: 'created_at',
    freezeTableName: true
});

ReturnMedia.belongsTo(ReturnRequest, {
    foreignKey: 'return_request_id',
    as: 'return_request'
});

module.exports = ReturnMedia