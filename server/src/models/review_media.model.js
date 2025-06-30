const {DataTypes} = require('sequelize');
const { sequelize } = require("../config/db");
const Review = require('./review.model');

const ReviewMedia = sequelize.define('ReviewMedia', {
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true
    },
    review_id: {
        type: DataTypes.BIGINT,
        allowNull: false
    },
    media_type: {
        type: DataTypes.ENUM('image', 'video'),
        allowNull: false
    }
}, {
    tableName: 'review_media',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    freezeTableName: true
});

ReviewMedia.belongsTo(Review, {
    foreignKey: 'review_id',
    as: 'review'
});

module.exports = ReviewMedia