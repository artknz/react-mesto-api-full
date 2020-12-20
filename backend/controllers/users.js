/* eslint-disable object-curly-newline */
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.status(200).send(users))
    .catch((err) => res.status(500).json({ message: `на сервере произошла ошибка ${err}` }));
};

const getUsersMe = (req, res) => {
  console.log(req.user);
  const id = req.user._id;
  User.findById(id)
    .then((user) => {
      if (!user) {
        res.status(404).send({ message: 'нет пользователя с таким id' });
      }
      res.status(200).send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({ message: 'невалидный id' });
      } else {
        res.status(500).json({ message: `на сервере произошла ошибка ${err}` });
      }
    });
};

const getProfile = (req, res) => {
  User.findOne({ _id: req.params.id })
    .then((user) => {
      if (!user) {
        res.status(404).send({ message: 'нет пользователя с таким id' });
      }
      res.status(200).send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({ message: 'невалидный id' });
      } else {
        res.status(500).json({ message: `на сервере произошла ошибка ${err}` });
      }
    });
};

const createUser = (req, res) => {
  bcrypt.hash(req.body.password, 10)
    .then((hash) => User.create({
      name: req.body.name,
      about: req.body.about,
      avatar: req.body.avatar,
      email: req.body.email,
      password: hash,
    }))
    .then((user) => res.status(200).send({ data: user }))
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({ message: 'Некорректные данные' });
      } else {
        (res.status(500).json({ message: `На сервере произошла ошибка ${err}` }));
      }
    });
};

const login = (req, res) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, 'some-secret-key', { expiresIn: '7d' });
      res.send({ token });
    })
    .catch((err) => {
      res.status(401).send({ message: err.message });
    });
};

module.exports = { getUsers, getUsersMe, getProfile, createUser, login };
