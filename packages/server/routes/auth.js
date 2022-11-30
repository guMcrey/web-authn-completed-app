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
        const { query, credId, username, deviceName } = req.query;
        if (!query && !username && !deviceName) {
            return res.status(400).send({
                code: 400,
                data: {},
                message: 'select query is required.'
            })
        }

        const result = await queryAuths({ query, credId, username, deviceName });
        res.status(200).send(result);
    } catch (err) {
        Object.assign(errorObj, { message: err.message });
        res.status(500).send(errorObj);
    }
});

// delete auth by id
router.delete('/:credId', async (req, res) => {
    try {
        const { credId } = req.params;
        if (!credId) {
            return res.status(400).send({
                code: 400,
                data: {},
                message: 'credId is required',
            })
        }

        const authInfo = await queryAuths({ credId });
        if (!authInfo.length) {
            return res.status(400).send({
                code: 400,
                data: {},
                message: 'auth not exist.',
            });
        }

        const result = await deleteAuth(credId);
        res.status(200).send(result);
    } catch (err) {
        Object.assign(errorObj, { message: err.message });
        res.status(500).send(errorObj);
    }
})

// register auth request
router.post('/registerRequest', async (req, res) => {
    try {
        const RP_NAME = 'Web Authn Completed App';
        const { username } = req.body;
        const usernameRegex = new RegExp(/^[0-9a-zA-Z_]{4,8}$/);
        if (!username || !usernameRegex.test(username)) {
            return res.status(400).send({
                code: 400,
                data: {},
                message: 'id is required',
            })
        }

        const userInfo = await queryUsers({ username });
        if (!userInfo.length) {
            return res.status(400).send({
                code: 400,
                data: {},
                message: 'user not exist',
            })
        }

        const authInfo = await queryAuths({ username });
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
router.post('/registerResponse', async (req, res) => {
    try {
        const { username } = req.query;
        const { body } = req;
        const expectedChallenge = req.session.challenge;
        const expectedOrigin = process.env.ORIGIN;
        const expectedRPID = process.env.HOSTNAME;

        if (!username || !body || !expectedChallenge || !expectedOrigin || !expectedRPID) {
            return res.status(400).send({
                code: 400,
                data: {},
                message: 'username, body, expectedChallenge, expectedOrigin, expectedRPID are required.'
            });
        }

        const verification = await fido2.verifyRegistrationResponse({
            credential: body,
            expectedChallenge,
            expectedOrigin,
            expectedRPID,
        });

        const { verified, registrationInfo } = verification;
        if (!verified) {
            return res.status(400).send({
                code: 400,
                data: {},
                message: 'User verification failed.'
            });
        }

        const { credentialPublicKey, credentialID, counter } = registrationInfo;
        const base64PublicKey = base64url.encode(credentialPublicKey);
        const base64CredentialID = base64url.encode(credentialID);
        const credentialBody = {
            credId: base64CredentialID,
            username,
            publicKey: base64PublicKey,
            prevCounter: counter,
            userAgent: req.get('User-Agent'),
        }
        const result = await createAuth(credentialBody)
        res.status(200).send(result);
        delete req.session.challenge;
    } catch (err) {
        Object.assign(errorObj, { message: err.message });
        res.status(500).send(errorObj);
        delete req.session.challenge;
    }
})

module.exports = router;