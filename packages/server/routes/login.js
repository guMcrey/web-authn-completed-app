const express = require('express');
const router = express.Router();
const { sessionCheck } = require('../utils/safetyCheck')
const { queryUsers, createUser } = require('../services/user');

const errorObj = {
    code: 500,
    data: {},
    message: 'Server Error.'
}

// check user login status
router.get('/is-login', async (req, res) => {
    try {
        const { lang } = req.query;

        if (req.session['signed-in'] !== 'yes') {
            return res.status(200).send({
                code: 401,
                data: {},
                message: lang === 'en' ? 'not signed in.' : '未登录'
            });
        }
        return res.status(200).send({
            code: 200,
            data: {},
            message: lang === 'en' ? 'login success.' : '登录成功'
        });
    } catch (err) {
        Object.assign(errorObj, { message: err });
        res.status(500).send(errorObj)
    }
});

router.post('/login', async (req, res) => {
    try {
        const { lang } = req.query;
        const { username, password } = req.body;
        const usernameRegex = new RegExp(/^[a-zA-Z][a-zA-Z0-9_]{3,7}$/);
        const passwordRegex = new RegExp(/^[a-zA-Z][a-zA-Z0-9_]{5,9}$/);
        if (!username || !password || !usernameRegex.test(username) || !passwordRegex.test(password)) {
            return res.status(400).send({
                code: 400,
                data: {},
                message: lang === 'en' ? 'username or password is invalid.' : '用户名或密码格式有误'
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
                    message: lang === 'en' ? 'username or password is wrong.' : '用户名或密码不正确'
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
        const { lang } = req.query

        req.session.destroy();
        res.status(200).send(lang === 'en' ? 'logout success' : '登出成功');
    } catch (err) {
        Object.assign(errorObj, { message: err });
        res.status(500).send(errorObj)
    }
})


module.exports = router;