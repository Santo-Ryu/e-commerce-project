const response = require('../utils/response.util');
const userService = require('../services/user.service');

const getAllUsers = async (req, res) => {
    try {
        const users = await userService.fetchAllUsers();
        response.success(res, users, 'List users.')
    }catch(error) {
        response.error(res, 'Server error.')
    }
};

const registerUser = async (req, res) => {

}

module.exports = { 
    getAllUsers,
    registerUser
};