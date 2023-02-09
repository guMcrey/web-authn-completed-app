const express = require('express');
const router = express.Router();
const { sessionCheck } = require('../utils/safetyCheck')
const { queryUsers, createUser, updateUser, deleteUser } = require('../services/user');

const errorObj = {
  code: 500,
  data: {},
  message: 'Server Error.'
}

// get user list
router.get('/', async (req, res) => {
  try {
    const { query, id, username, password, lang } = req.query;
    if (!query && !id && !username && !password) {
      return res.status(400).send({
        code: 400,
        data: {},
        message: lang === 'en' ? 'select query field is required.' : '搜索参数不能为空'
      })
    };

    const result = await queryUsers({ query, id, username, password });
    res.status(200).send(result);
  } catch (err) {
    Object.assign(errorObj, { message: err });
    res.status(500).send(errorObj)
  }
});

// get latest user and all user count
router.get('/latest-and-count', async (req, res) => {
  try {
    const result = await queryUsers({ query: 'all' });
    res.status(200).send({
      latestUser: result[0]?.username || '',
      count: result.length,
    });
  } catch (err) {
    Object.assign(errorObj, { message: err });
    res.status(500).send(errorObj)
  }
});

// create user
router.post('/', async (req, res) => {
  try {
    const { lang, username, password } = req.body;
    const usernameRegex = new RegExp(/^[a-zA-Z][a-zA-Z0-9_]{3,7}$/);
    const passwordRegex = new RegExp(/^[a-zA-Z][a-zA-Z0-9_]{5,9}$/);
    if (!username || !password || !usernameRegex.test(username) || !passwordRegex.test(password)) {
      return res.status(400).send({
        code: 400,
        data: {},
        message: lang === 'en' ? 'username or password is invalid.' : '用户名或密码格式有误'
      })
    }

    const userInfo = await queryUsers({ username });
    if (userInfo.length) {
      return res.status(400).send({
        code: 400,
        data: {},
        message: lang === 'en' ? 'username is exist, please use another one.' : '用户名已存在, 请更改后再试'
      })
    }

    const result = await createUser(username, password);
    res.status(200).send(result);
  } catch (err) {
    Object.assign(errorObj, { message: err.message });
    res.status(500).send(errorObj)
  }
})

// update username
router.patch('/:id', sessionCheck, async (req, res) => {
  try {
    const { username } = req.body
    const { id } = req.params
    if (!username || !id) {
      return res.status(400).send({
        code: 400,
        data: {},
        message: 'username or id is invalid.',
      });
    };

    const userInfo = await queryUsers({ username });
    if (userInfo.length && userInfo[0]?.id !== id) {
      return res.status(400).send({
        code: 400,
        data: {},
        message: 'username is exist, please use another one.',
      });
    }

    const result = await updateUser(id, username);
    res.status(200).send(result);
  } catch (err) {
    Object.assign(errorObj, { message: err.message })
    res.status(500).send(errorObj)
  }
})

// delete user
router.delete('/:id', sessionCheck, async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).send({
        code: 400,
        data: {},
        message: 'id is required',
      })
    }

    const userInfo = await queryUsers({ id });
    if (!userInfo.length) {
      return res.status(400).send({
        code: 400,
        data: {},
        message: 'user not exist.',
      });
    }

    const result = await deleteUser(id);
    res.status(200).send(result);
  } catch (err) {
    Object.assign(errorObj, { message: err.message });
    res.status(500).send(errorObj);
  }
})

module.exports = router;
