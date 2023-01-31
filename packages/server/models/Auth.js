const { query } = require('../utils/database');
const SqlString = require('sqlstring');

const Auth = {
    selectAllAuth: async () => {
        const sql = SqlString.format('SELECT * FROM credential ORDER BY createTime DESC');
        const credentials = await query(sql);
        return credentials;
    },
    selectAuthByQuery: async (credId, username, deviceName) => {
        let sql = `SELECT * FROM credential WHERE`;
        let count = 0;
        if (credId) {
            count++;
            sql += ` credId = '${credId}'`;
        }
        if (username) {
            count++;
            if (count > 1) {
                sql += ' AND'
            }
            sql += ` username = '${username}'`;
        }
        if (deviceName) {
            count++;
            if (count > 1) {
                sql += ' AND'
            }
            sql += ` deviceName = '${deviceName}'`;
        }
        sql += ` ORDER BY createTime DESC`;
        
        const credentials = await query(SqlString.format(sql));
        return credentials;
    },
    insertAuth: async (credId, username, publicKey, prevCounter, deviceName) => {
        const sql = 'INSERT INTO credential SET ?';
        const createTime = new Date().toISOString();
        const credential = await query(SqlString.format(sql), { credId, username, publicKey, prevCounter, deviceName, createTime });
        return credential;
    },
    updateAuth: async (credId, prevCounter) => {
        const sql = 'UPDATE credential SET prevCounter = ? WHERE credId = ?';
        const credential = await query(SqlString.format(sql), [prevCounter, credId]);
        return credential;
    },
    deleteAuth: async (credId) => {
        const sql = 'DELETE FROM credential WHERE credId = ?';
        const credential = await query(SqlString.format(sql), credId);
        return credential;
    }
}

module.exports = Auth;