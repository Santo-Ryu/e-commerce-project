const {DataTypes} = require('sequelize')
const { sequelize } = require("../config/db")

const AdministrativeUnit = sequelize.define('AdministrativeUnit', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: true
    },
    full_name: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    full_name_en: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    short_name: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    short_name_en: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    code_name: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    code_name_en: {
        type: DataTypes.STRING(255),
        allowNull: true
    }
}, {
    tableName: 'administrative_units',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    freezeTableName: true
});

module.exports = AdministrativeUnit