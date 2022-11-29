const { query } = require('../utils/database');

const User = {
    selectAllUsers: async () => {
        const sql = 'SELECT * FROM user';
        const users = await query(sql);
        return users;
    },
    selectUserByQuery: async (id, username, password) => {
        // TODO: sql logic improve
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
        const user = await query(sql);
        return user;

    },
    insertUser: async (id, username, password) => {
        const sql = 'INSERT INTO user SET ?';
        const user = await query(sql, { id, username, password });
        return user;
    },
    updateUser: async (id, username) => {
        const sql = 'UPDATE user SET `username` = ? WHERE `id` = ?';
        const user = await query(sql, [username, id]);
        return user;
    },
    deleteUser: async (id) => {
        const sql = 'DELETE FROM user WHERE id = ?';
        const user = await query(sql, id);
        return user;
    },
}

module.exports = User;