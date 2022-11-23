const { query } = require('../utils/database');

const Auth = {
    selectAllAuth: async () => {
        const sql = 'SELECT * FROM credential';
        const credentials = await query(sql);
        return credentials;
    },
    selectAuthByQuery: async (credId, username, deviceName) => {
        const sql = 'SELECT * FROM credential WHERE credId = ? AND username = ? AND deviceName = ?';
        const credentials = await query(sql, [credId, username, deviceName]);
        return credentials;
    },
    insertAuth: async (credId, username, publicKey, prevCounter, deviceName) => {
        const sql = 'INSERT INTO credential SET ?';
        const credential = await query(sql, { credId, username, publicKey, prevCounter, deviceName });
        return credential;
    },
    updateAuth: async (credId, prevCounter) => {
        const sql = 'UPDATE credential SET prevCounter = ? WHERE credId = ?';
        const credential = await query(sql, [prevCounter, credId]);
        return credential;
    },
    deleteAuth: async (credId) => {
        const sql = 'DELETE FROM credential WHERE credId = ?';
        const credential = await query(sql, credId);
        return credential;
    }
}

module.exports = Auth;