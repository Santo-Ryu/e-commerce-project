const jwt = require('jsonwebtoken');
require('dotenv').config();

const secret = process.env.JWT_SECRET;
const expiresInDefault = process.env.JWT_EXPIRES_IN || '1d';

exports.generateToken = (payload, expiresIn = expiresInDefault) => {
    return jwt.sign(payload, secret, { expiresIn });
};

exports.verifyToken = (token) => {
    return jwt.verify(token, secret);
};

exports.decodeToken = (token) => {
    return jwt.decode(token);
};