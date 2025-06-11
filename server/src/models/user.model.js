const { DataTypes } = require('sequelize')
const { sequelize } = require("../config/db");
const Image = require('./image.model');

const User = sequelize.define('User', {
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true
    },
    email: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    name: {
        type: DataTypes.STRING(30),
        allowNull: false
    },
    phone: {
        type: DataTypes.STRING(10),
        allowNull: false,
        unique: true
    },
    role: {
        type: DataTypes.ENUM('admin', 'customer', 'seller'),
        allowNull: false
    },
    image_id: {
        type: DataTypes.BIGINT,
        allowNull: true,
        unique: true
    },
    verified: {
        type: DataTypes.ENUM('verified', 'unverified'),
        defaultValue: 'unverified'
    },
    verified_at: {
        type: DataTypes.DATE
    },
    deleted_at: {
        type: DataTypes.DATE
    }
}, {
    tableName: 'users',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    paranoid: true,
    deletedAt: 'deleted_at',
    freezeTableName: true,
    defaultScope: {
        attributes: { exclude: ['password'] }
    },
    instanceMethods: {
        toJSON: function () {
            const values = Object.assign({}, this.get());
            delete values.password;
            return values;
        }
    }
});

User.belongsTo(Image, {
    foreignKey: 'image_id',
    as: 'image'
});

module.exports = User