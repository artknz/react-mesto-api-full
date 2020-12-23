/* eslint-disable object-curly-newline */
const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { getUsers, getProfile, getUsersMe } = require('../controllers/users');

router.get('/', getUsers);
router.get('/me', getUsersMe);
router.get('/:id', celebrate({
  params: Joi.object().keys({
    id: Joi.string().min(24).hex(),
  }),
}), getProfile);

module.exports = router;
