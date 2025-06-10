const {DataTypes} = require('sequelize')
const { sequelize } = require("../config/db")

const AdministrativeRegion = sequelize.define('AdministrativeRegion', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    name_en: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    code_name: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    code_name_en: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
}, {
    tableName: 'administrative_regions',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    freezeTableName: true
});

module.exports = AdministrativeRegion