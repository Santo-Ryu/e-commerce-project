const {DataTypes} = require('sequelize')
const { sequelize } = require("../config/db");
const AdministrativeRegion = require('./administrative_region.model');
const AdministrativeUnit = require('./administrative_unit.model');

const Province = sequelize.define('Province', {
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
    administrative_unit_id: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    administrative_region_id: {
        type: DataTypes.INTEGER,
        allowNull: true
    }
}, {
    tableName: 'provinces',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    freezeTableName: true
});

Province.belongsTo(AdministrativeRegion, {
    foreignKey: 'administrative_region_id',
    as: 'region'
});

Province.belongsTo(AdministrativeUnit, {
    foreignKey: 'administrative_unit_id',
    as: 'unit'
});

module.exports = Province