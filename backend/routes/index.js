const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const cards = require('./cards');
const users = require('./users');
const error = require('./error');

const { login, createUser } = require('../controllers/users');
const auth = require('../middlewares/auth');

router.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required(),
    password: Joi.string().required().min(8),
  }),
}), createUser);
router.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required(),
    password: Joi.string().required().min(8),
  }),
}), login);

router.use('/cards', auth, cards);
router.use('/users', auth, users);

router.use('*', error);

module.exports = router;
