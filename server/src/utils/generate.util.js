const { v4: uuidv4 } = require('uuid');

exports.generateUsername = (prefix = "user") => `${prefix}_${Date.now()}`;
exports.generateCoupon = () => uuidv4().toUpperCase();