const express = require('express');
const router = express.Router();
const { queryUsers, createUser, updateUser, deleteUser } = require('../services/user');

const errorObj = {
  code: 500,
  data: {},
  message: 'Server Error.'
}

/* get user list */
router.get('/', async (req, res, next) => {
  try {
    const query = req.query.query
    if (!query) {
      res.status(400).send({
        code: 400,
        data: {},
        message: 'query field is required.'
      })
    };
    const result = await queryUsers(query);
    res.status(200).send(result);
  } catch (err) {
    Object.assign(errorObj, { message: err });
    res.status(500).send(errorObj)
  }
});

/* create  user */
router.post('/', async (req, res, next) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      res.status(400).send({
        code: 400,
        data: {},
        message: 'username and password field is required.'
      })
    }
    const result = await createUser(username, password);
    res.status(200).send(result);
  } catch (err) {
    Object.assign(errorObj, { message: err });
    res.status(500).send(errorObj)
  }
})

module.exports = router;
