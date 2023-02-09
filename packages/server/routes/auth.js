const express = require('express');
const router = express.Router();
const base64url = require('base64url');
const fido2 = require('@simplewebauthn/server');
const { sessionCheck } = require('../utils/safetyCheck')
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
        const { lang, query, credId, username, deviceName } = req.query;
        if (!query && !username && !deviceName) {
            return res.status(400).send({
                code: 400,
                data: {},
                message: lang === 'en' ? 'select query is required.' : '查询参数不能为空'
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
router.delete('/:credId', sessionCheck, async (req, res) => {
    try {
        const { lang } = req.query;
        const { credId } = req.params;
        if (!credId) {
            return res.status(400).send({
                code: 400,
                data: {},
                message: lang === 'en' ? 'credId is required' : 'credId 不存在',
            })
        }

        const authInfo = await queryAuths({ credId });
        if (!authInfo.length) {
            return res.status(400).send({
                code: 400,
                data: {},
                message: lang === 'en' ? 'auth not exist.' : '未找到关联的鉴权数据',
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
router.post('/registerRequest', sessionCheck, async (req, res) => {
    try {
        const RP_NAME = 'Web Authn Completed App';
        const { lang } = req.query;
        const { username, isAndroid } = req.body;
        const usernameRegex = new RegExp(/^[a-zA-Z][a-zA-Z0-9_]{3,7}$/);

        if (!username || !usernameRegex.test(username)) {
            return res.status(400).send({
                code: 400,
                data: {},
                message: lang === 'en' ? 'username is invalid' : '用户名格式有误',
            })
        }

        const userInfo = await queryUsers({ username });
        if (!userInfo.length) {
            return res.status(400).send({
                code: 400,
                data: {},
                message: lang === 'en' ? 'user not exist' : '用户不存在',
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

        const fido2Options = {
            rpName: RP_NAME,
            rpID: process.env.HOSTNAME,
            userID: userInfo[0].id,
            userName: userInfo[0].username,
            attestationType: 'none',
            userVerification: 'required',
            excludeCredentials,
        }

        if (isAndroid) {
            Object.assign(fido2Options, {
                authenticatorSelection: {
                    authenticatorAttachment: 'platform',
                }
            })
        }

        const options = await fido2.generateRegistrationOptions(fido2Options)

        req.session.challenge = options.challenge;
        res.status(200).send(options);
    } catch (err) {
        Object.assign(errorObj, { message: err.message });
        res.status(500).send(errorObj);
    }
})

// register auth response
router.post('/registerResponse', sessionCheck, async (req, res) => {
    try {
        const { lang, username } = req.query;
        const { body } = req;
        const expectedChallenge = req.session.challenge;
        const expectedOrigin = process.env.ORIGIN;
        const expectedRPID = process.env.HOSTNAME;

        if (!username || !body || !expectedChallenge || !expectedOrigin || !expectedRPID) {
            return res.status(400).send({
                code: 400,
                data: {},
                message: lang === 'en' ? 'username, body, expectedChallenge, expectedOrigin, expectedRPID are required.' : '必选参数不能为空'
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
                message: lang === 'en' ? 'User verification failed.' : '用户验证失败'
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

// sign in with auth request
router.post('/signinRequest', async (req, res) => {
    try {
        const { lang, username, credId, isAndroid } = req.query;
        let allowCredentials = [];
        const fido2Options = {};

        if (isAndroid) {
            const usernameRegex = new RegExp(/^[a-zA-Z][a-zA-Z0-9_]{3,7}$/);
            if (!username || !usernameRegex.test(username)) {
                return res.status(400).send({
                    code: 400,
                    data: {},
                    message: lang === 'en' ? 'username is invalid' : '用户名格式有误',
                })
            }

            const userInfo = await queryUsers({ username });
            if (!userInfo.length) {
                return res.status(400).send({
                    code: 400,
                    data: {},
                    message: lang === 'en' ? 'user not exist' : '用户不存在',
                })
            }

            const authInfo = await queryAuths({ username });
            for (const auth of authInfo) {
                if (credId && auth.credId == credId) {
                    allowCredentials.push({
                        id: base64url.toBuffer(auth.credId),
                        type: 'public-key',
                        transports: ['internal']
                    });
                }
            }

            Object.assign(fido2Options, {
                authenticatorSelection: {
                    authenticatorAttachment: 'platform',
                }
            });
        }

        Object.assign(fido2Options, {
            allowCredentials,
            attestationType: 'none',
            userVerification: 'required',
        });

        const options = await fido2.generateAuthenticationOptions(fido2Options);

        req.session.challenge = options.challenge;
        res.status(200).send(options);
    } catch (err) {
        Object.assign(errorObj, { message: err.message });
        res.status(500).send(errorObj);
    }
});

// sign in with auth response
router.post('/signinResponse', async (req, res) => {
    try {
        const { lang } = req.query;
        const { body } = req;
        const expectedChallenge = req.session.challenge;
        const expectedOrigin = process.env.ORIGIN;
        const expectedRPID = process.env.HOSTNAME;

        if (!body || !body.id || !expectedChallenge || !expectedOrigin || !expectedRPID) {
            return res.status(400).send({
                code: 400,
                data: {},
                message: lang === 'en' ? 'body, expectedChallenge, expectedOrigin, expectedRPID are required.' : '必选字段不能为空'
            });
        }

        const authInfo = await queryAuths({ credId: body.id });
        const credential = authInfo[0];
        credential.credentialPublicKey = base64url.toBuffer(credential.publicKey);
        credential.credentialID = base64url.toBuffer(credential.credId);
        credential.counter = credential.prevCounter;

        if (!credential) {
            throw lang === 'en' ? 'Authenticating credential not found.' : '未找到验证签名';
        }

        const verification = await fido2.verifyAuthenticationResponse({
            credential: body,
            expectedChallenge,
            expectedOrigin,
            expectedRPID,
            authenticator: credential,
        });

        const { verified, authenticationInfo } = verification;

        if (!verified) {
            return res.status(400).send({
                code: 400,
                data: {},
                message: lang === 'en' ? 'User verification failed.' : '用户验证失败',
            });
        }

        const { newCounter } = authenticationInfo;
        const { credId } = credential;
        credential.prevCounter = newCounter;
        await updateAuth(credId, newCounter)

        delete req.session.challenge;
        req.session['signed-in'] = 'yes';
        res.status(200).send({ credId: body.id, username: credential.username });
    } catch (err) {
        if (err.message.search('undefined') !== -1) {
            return res.status(200).send({
                code: 404,
                data: {},
                message: err.message
            })
        }
        Object.assign(errorObj, { message: err.message || err });
        res.status(500).send(errorObj);
        delete req.session.challenge;
    }
});

module.exports = router;