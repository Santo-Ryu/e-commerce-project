const {DataTypes} = require('sequelize')
const { sequelize } = require("../config/db");
const Province = require('./province.model');
const District = require('./districts.model');
const Ward = require('./ward.model');

const Address = sequelize.define('Address', {
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true
    },
    user_id: {
        type: DataTypes.BIGINT,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING(30),
        allowNull: false
    },
    phone: {
        type: DataTypes.STRING(10),
        allowNull: false
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
    }
}, {
    tableName: 'address',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    freezeTableName: true
});

Address.belongsTo(Province, {
    foreignKey: 'province_code',
    as: 'province'
});

Address.belongsTo(District, {
    foreignKey: 'district_code',
    as: 'district'
});

Address.belongsTo(Ward, {
    foreignKey: 'ward_code',
    as: 'ward'
});

module.exports = Address