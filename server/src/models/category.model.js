const {DataTypes} = require('sequelize')
const { sequelize } = require("../config/db");

const Category = sequelize.define('Category', {
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true
    },
    active: {
        type: DataTypes.ENUM('active', 'stopped'),
        allowNull: false,
        defaultValue: 'active'
    }
}, {
    tableName: 'categories',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    paranoid: true,
    deletedAt: 'deleted_at',
    freezeTableName: true
});

module.exports = Category