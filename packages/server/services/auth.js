const authModel = require('../models/Auth');
const { v4: uuidv4 } = require('uuid');
const deviceInfo = require('../utils/device');

const queryAuths = async (query, username, deviceName) => {
    let authList = [];
    if (query === 'all') {
        authList = await authModel.selectAllAuth();
    }
    if (query !== 'all' || username || deviceName) {
        authList = await authModel.selectAuthByQuery(username, deviceName);
    }
    return authList;
}

const createAuth = async (username, publicKey, prevCounter, userAgent) => {
    const credId = uuidv4();
    const deviceName = deviceInfo(userAgent)?.browser?.name;
    const auth = await authModel.insertAuth(credId, username, publicKey, prevCounter, deviceName);
    return auth;
}

const updateAuth = async (credId, prevCounter) => {
    const auth = await authModel.updateAuth(credId, prevCounter);
    return auth;
}

const deleteAuth = async (credId) => {
    const auth = await authModel.deleteAuth(credId);
    return auth;
}


module.exports = {
    queryAuths,
    createAuth,
    updateAuth,
    deleteAuth,
}
