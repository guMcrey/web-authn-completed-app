const express = require('express');
const router = express.Router();
const base64url = require('base64url');
const fido2 = require('@simplewebauthn/server');
const { queryUsers } = require('../services/user');
const { queryAuths, createAuth, updateAuth, deleteAuth, } = require('../services/auth');

const errorObj = {
    code: 500,
    data: {},
    message: 'Server Error.'
}

// get auth list
router.get('/', async (req, res) => {
    try {
        const { query, username, deviceName } = req.query;
        if (!query && !username && !deviceName) {
            return res.status(400).send({
                code: 400,
                data: {},
                message: 'select query is required.'
            })
        }

        const result = await queryAuths(query, username, deviceName);
        res.status(200).send(result);
    } catch (err) {
        Object.assign(errorObj, { message: err.message });
        res.status(500).send(errorObj);
    }
});

// register auth request
router.post('/registerRequest', async (req, res) => {
    try {
        const RP_NAME = 'Web Authn App';
        const { username } = req.body;
        const usernameRegex = new RegExp(/^[0-9a-zA-Z_]{4,8}$/);
        if (!username || !usernameRegex.test(username)) {
            return res.status(400).send({
                code: 400,
                data: {},
                message: 'id is required',
            })
        }

        const userInfo = await queryUsers(username);
        if (!userInfo.length) {
            return res.status(400).send({
                code: 400,
                data: {},
                message: 'user not exist',
            })
        }

        const authInfo = await queryAuths(username);
        const excludeCredentials = [];
        if (authInfo.length) {
            for (const auth of authInfo) {
                excludeCredentials.push({
                    id: base64url.toBuffer(auth.credId),
                    type: 'public-key',
                    transports: ['internal'],
                })
            }
        }

        const options = fido2.generateRegistrationOptions({
            rpName: RP_NAME,
            rpID: process.env.HOSTNAME,
            userID: userInfo[0].id,
            userName: userInfo[0].username,
            attestationType: 'none',
            excludeCredentials,
            authenticatorSelection: {
                authenticatorAttachment: 'platform',
            }
        })

        req.session.challenge = options.challenge;
        res.status(200).send(options);
    } catch (err) {
        Object.assign(errorObj, { message: err.message });
        res.status(500).send(errorObj);
    }
})

// register auth response

module.exports = router;