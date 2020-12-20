const router = require('express').Router();
const cards = require('./cards');
const users = require('./users');
const error = require('./error');

const { login, createUser } = require('../controllers/users');
const auth = require('../middlewares/auth');

router.post('/signup', createUser);
router.post('/signin', login);

router.use('/cards', auth, cards);
router.use('/users', auth, users);

router.use('*', error);

module.exports = router;
