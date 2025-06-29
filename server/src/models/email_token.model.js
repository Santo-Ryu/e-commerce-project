const {DataTypes} = require('sequelize')
const { sequelize } = require("../config/db");
const User = require('./user.model');

const EmailToken = sequelize('EmailToken', {
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
    token: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true
    },
    type: {
        type: DataTypes.ENUM('password_reset', 'email_verification'),
        allowNull: false
    },
    expired_at: {
        type: DataTypes.DATE,
        allowNull: false
    }
}, {
    tableName: 'email_tokens',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    freezeTableName: true
});

EmailToken.belongsTo(User, {
    foreignKey: 'email',
    as: 'user'
});

module.exports = EmailToken