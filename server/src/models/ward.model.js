const {DataTypes} = require('sequelize')
const { sequelize } = require("../config/db");
const AdministrativeUnit = require('./administrative_unit.model');
const District = require('./districts.model');

const Ward = sequelize.define('Ward', {
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
    district_code: {
        type: DataTypes.STRING(20),
        allowNull: true
    },
    administrative_unit_id: {
        type: DataTypes.INTEGER,
        allowNull: true
    }
}, {
    tableName: 'wards',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    freezeTableName: true
});

Ward.belongsTo(District, {
    foreignKey: 'district_code',
    as: 'district'  
});

Ward.belongsTo(AdministrativeUnit, {
    foreignKey: 'administrative_unit_id',
    as: 'unit'
});

module.exports = Ward