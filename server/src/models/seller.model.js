const {DataTypes} = require('sequelize')
const { sequelize } = require("../config/db");
const User = require('./user.model');
const Province = require('./province.model');
const District = require('./districts.model');
const Ward = require('./ward.model');

const Seller = sequelize.define('Seller', {
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true
    },
    user_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        unique: true
    },
    business_license: {
        type: DataTypes.ENUM('pending', 'approved', 'expired'),
        allowNull: false,
        defaultValue: 'pending'
    },
    payment_status: {
        type: DataTypes.ENUM('unpaid', 'paid'),
        allowNull: false,
        defaultValue: 'unpaid'
    },
    province_code: {
        type: DataTypes.STRING(20)
    },
    district_code: {
        type: DataTypes.STRING(20)
    },
    ward_code: {
        type: DataTypes.STRING(20)
    },
    address_description: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    expired_at: {
        type: DataTypes.DATE
    }
}, {
    tableName: 'sellers',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    freezeTableName: true
});

Seller.belongsTo(User, {
    foreignKey: 'user_id',
    as: 'user'
});

Seller.belongsTo(Province, {
    foreignKey: 'province_code',
    as: 'province'
});

Seller.belongsTo(District, {
    foreignKey: 'district_code',
    as: 'district'
});

Seller.belongsTo(Ward, {
    foreignKey: 'ward_code',
    as: 'ward'
});

module.exports = Seller