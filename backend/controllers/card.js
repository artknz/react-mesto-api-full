const Card = require('../models/card');
const NotFoundError = require('../errors/bad-request');
const InternalServerError = require('../errors/internal-server-error');

const getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.status(200).send(cards))
    .catch(() => next(new InternalServerError('Ошибка сервера')));
};

const createCard = (req, res, next) => {
  const { _id } = req.user;
  console.log(req.body);
  const { name, link } = req.body;
  Card.create({ name, link, owner: _id })
    .then((card) => res.status(200).send({ data: card }))
    .catch(() => next(new InternalServerError('Ошибка сервера')));
};

const deleteCard = (req, res, next) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then((card) => {
      if (!card) {
        throw new NotFoundError('нет карточки с таким id');
      }
      res.status(200).send(card);
    })
    .catch(next);
};

module.exports = { getCards, createCard, deleteCard };
