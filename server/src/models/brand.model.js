const { DataTypes } = require('sequelize')
const { sequelize } = require("../config/db");
const Image = require('./image.model');

const Brand = sequelize.define('Brand', {
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true
    },
    seller_id: {
        type: DataTypes.BIGINT,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    image_id: {
        type: DataTypes.BIGINT
    },
    description: {
        type: DataTypes.TEXT
    }
}, {
    tableName: 'brands',
    timestamps: true,
    createdAt: 'created_at',
    freezeTableName: true
});

Brand.belongsTo(Image, {
    foreignKey: 'image_id',
    as: 'image'
});

module.exports = Brand