const userModel = require('../models/user');
const { v4: uuidv4 } = require('uuid');

const queryUsers = async (query) => {
    let users = [];
    if (query === 'all') {
        users = await userModel.selectAllUsers();
    } else {
        users = await userModel.selectUserById(query);
    }
    return users;
}

const createUser = (username, password) => {
    const id = uuidv4();
    const user = userModel.insertUser(id, username, password);
    return user;
}

const updateUser = (id, username) => {
    const user = userModel.updateUser(id, username);
    return user;
}

const deleteUser = (id) => {
    const user = userModel.deleteUser(id);
    return user;
}

module.exports = {
    queryUsers,
    createUser,
    updateUser,
    deleteUser,
};