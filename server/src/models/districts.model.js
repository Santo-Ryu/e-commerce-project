const {DataTypes} = require('sequelize')
const { sequelize } = require("../config/db");
const AdministrativeUnit = require('./administrative_unit.model');
const Province = require('./province.model');

const District = sequelize.define('District', {
    code: {
        type: DataTypes.STRING(20),
        primaryKey: true,
        allowNull: true
    },
    name: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    name_en: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    full_name: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    full_name_en: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    code_name: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    province_code: {
        type: DataTypes.STRING(20),
        allowNull: true
    },
    administrative_unit_id: {
        type: DataTypes.INTEGER,
        allowNull: true
    }
}, {
    tableName: 'districts',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    freezeTableName: true
});

District.belongsTo(Province, {
    foreignKey: 'province_code',
    as: 'province'
});

District.belongsTo(AdministrativeUnit, {
    foreignKey: 'administrative_unit_id',
    as: 'unit'
});

module.exports = District