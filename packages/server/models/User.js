const { query } = require('../utils/database');
const SqlString = require('sqlstring');

const User = {
    selectAllUsers: async () => {
        const sql = SqlString.format('SELECT * FROM user ORDER BY createTime DESC');
        const users = await query(sql);
        return users;
    },
    selectUserByQuery: async (id, username, password) => {
        let sql = `SELECT * FROM user WHERE`;
        let count = 0;
        if (id) {
            count++;
            sql += ` id = '${id}'`;
        }
        if (username) {
            count++;
            if (count > 1) {
                sql += ' AND'
            }
            sql += ` username = '${username}'`;
        }
        if (password) {
            count++;
            if (count > 1) {
                sql += ' AND'
            }
            sql += ` password = '${password}'`;
        }
        const user = await query(SqlString.format(sql));
        return user;
    },
    insertUser: async (id, username, password) => {
        const sql = 'INSERT INTO user SET ?';
        const createTime = new Date().toISOString();
        const user = await query(SqlString.format(sql), { id, username, password, createTime });
        return user;
    },
    updateUser: async (id, username) => {
        const sql = 'UPDATE user SET username = ? WHERE id = ?';
        const user = await query(SqlString.format(sql), [username, id]);
        return user;
    },
    deleteUser: async (id) => {
        const sql = 'DELETE FROM user WHERE id = ?';
        const user = await query(SqlString.format(sql), id);
        return user;
    },
}

module.exports = User;