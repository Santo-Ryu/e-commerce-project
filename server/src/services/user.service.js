const User = require("../models/user.model")

const fetchAllUsers = async () => {
    try {
        return await User.findAll();
    }catch(error) {
        throw new Error('Error while getting user list.')
    } 
};

module.exports = { fetchAllUsers }