const express = require('express');
const router = express.Router();
const { queryUsers, createUser, updateUser, deleteUser } = require('../services/user');

const errorObj = {
  code: 500,
  data: {},
  message: 'Server Error.'
}

// get user list
router.get('/', async (req, res) => {
  try {
    const { query, id, username, password } = req.query;
    if (!query && !id && !username && !password) {
      return res.status(400).send({
        code: 400,
        data: {},
        message: 'select query field is required.'
      })
    };

    const result = await queryUsers({ query, id, username, password });
    res.status(200).send(result);
  } catch (err) {
    Object.assign(errorObj, { message: err });
    res.status(500).send(errorObj)
  }
});

// create user
router.post('/', async (req, res) => {
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

    const userInfo = await queryUsers({ username });
    if (userInfo.length) {
      return res.status(400).send({
        code: 400,
        data: {},
        message: 'username is exist, please use another one.'
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
router.patch('/:id', async (req, res) => {
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
router.delete('/:id', async (req, res) => {
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
