const authModel = require('../models/Auth');
const deviceInfo = require('../utils/device');

const queryAuths = async ({ query, credId, username, deviceName }) => {
    let authList = [];
    if (query === 'all') {
        authList = await authModel.selectAllAuth();
    }
    if (query !== 'all' && (credId || username || deviceName)) {
        authList = await authModel.selectAuthByQuery(credId, username, deviceName);
    }
    return authList;
}

const createAuth = async ({ credId, username, publicKey, prevCounter, userAgent }) => {
    const { name: browserName, version: browserVersion } = deviceInfo(userAgent)?.browser
    const { name: osName, version: osVersion } = deviceInfo(userAgent)?.os
    const deviceName = `${browserName} ${browserVersion} - ${osName} ${osVersion}`;
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
