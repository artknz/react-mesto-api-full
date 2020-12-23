const Card = require('../models/card');
const NotFoundError = require('../errors/not-found-err');
const InternalServerError = require('../errors/internal-server-error');
const Forbidden = require('../errors/forbiddenError');

const getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.status(200).send(cards))
    .catch(() => next(new InternalServerError('Ошибка сервера')));
};

const createCard = (req, res, next) => {
  const { _id } = req.user;
  const { name, link } = req.body;
  Card.create({ name, link, owner: _id })
    .then((card) => res.status(200).send({ data: card }))
    .catch(() => next(new InternalServerError('Ошибка сервера')));
};

const deleteCard = (req, res, next) => {
  const { cardId } = req.params;

  Card.findById(cardId)
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Карточка с таким id не обнаружена');
      }
      if (req.user._id !== card.owner.toString()) {
        throw new Forbidden('Удалять карточку может только ее создатель');
      }
      Card.findByIdAndRemove(cardId)
        .then(() => {
          res.send({ data: card });
        })
        .catch(next);
    })
    .catch((err) => {
      if (err.kind === 'ObjectId') {
        next(new NotFoundError('Карточка с таким id не обнаружена'));
      } else {
        next(err);
      }
    });
};

module.exports = { getCards, createCard, deleteCard };
