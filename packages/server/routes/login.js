const express = require('express');
const router = express.Router();
const { sessionCheck } = require('../utils/safetyCheck')
const { queryUsers, createUser } = require('../services/user');

const errorObj = {
    code: 500,
    data: {},
    message: 'Server Error.'
}

router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const usernameRegex = new RegExp(/^[0-9a-zA-Z_]{4,8}$/);
        const passwordRegex = new RegExp(/^[0-9a-zA-Z_]{6,10}$/);
        if (!username || !password || !usernameRegex.test(username) || !passwordRegex.test(password)) {
            return res.status(400).send({
                code: 400,
                data: {},
                message: 'username and password is invalid.'
            })
        }

        const user = await queryUsers({ username });
        let userResult = {};

        // check password
        if (user.length) {
            userResult = await queryUsers({ username, password });
            if (!userResult.length) {
                return res.status(400).send({
                    code: 400,
                    data: {},
                    message: 'username or password is wrong.'
                })
            }
        }

        // create
        if (!user.length) {
            userResult = await createUser(username, password);
        }
        req.session['signed-in'] = 'yes';
        res.status(200).send(userResult[0] || userResult);
    } catch (err) {
        Object.assign(errorObj, { message: err });
        res.status(500).send(errorObj)
    }
});

router.get('/logout', sessionCheck, async (req, res) => {
    try {
        req.session.destroy();
        res.status(200).send('logout success');
    } catch (err) {
        Object.assign(errorObj, { message: err });
        res.status(500).send(errorObj)
    }
})


module.exports = router;