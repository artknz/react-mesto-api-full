/* eslint-disable object-curly-newline */
const router = require('express').Router();
const { getUsers, getProfile, getUsersMe } = require('../controllers/users');

router.get('/', getUsers);
router.get('/me', getUsersMe);
router.get('/:id', getProfile);

module.exports = router;
