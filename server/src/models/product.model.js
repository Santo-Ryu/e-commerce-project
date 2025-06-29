const {DataTypes} = require('sequelize')
const { sequelize } = require("../config/db");
const Category = require('./category.model');
const Brand = require('./brand.model');

const Product = sequelize.define('Product', {
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING(200),
        allowNull: false
    },
    category_id: {
        type: DataTypes.BIGINT
    },
    brand_id: {
        type: DataTypes.BIGINT,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT('long'),
        allowNull: false
    },
    rating: {
        type: DataTypes.DECIMAL(3,1),
        allowNull: true
    },
    sales_count: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    views_count: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    stock: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    active: {
        type: DataTypes.ENUM('selling', 'out_of_stock', 'stopped'),
        allowNull: false,
        defaultValue: 'selling'
    },
    discount_percent: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    discount_start_date: {
        type: DataTypes.DATE
    },
    discount_end_date: {
        type: DataTypes.DATE
    }
}, {
    tableName: 'products',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    paranoid: true,
    deletedAt: 'deleted_at',
    freezeTableName: true
});

Product.belongsTo(Category, {
    foreignKey: 'category_id',
    as: 'category'
});

Product.belongsTo(Brand, {
    foreignKey: 'brand_id',
    as: 'brand'
});

module.exports = Product