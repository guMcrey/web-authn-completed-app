const { query } = require('../utils/database');

const User = {
    selectAllUsers: async () => {
        const sql = 'SELECT * FROM user';
        const user = await query(sql);
        return user;
    },
    selectUserByQuery: async (queryString) => {
        const sql = 'SELECT * FROM user WHERE id = ? OR username = ?';
        const user = await query(sql, [queryString, queryString]);
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