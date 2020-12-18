const Card = require('../models/card');

const getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.status(200).send(cards))
    .catch((err) => res.status(500).json({ message: `на сервере произошла ошибка ${err}` }));
};

const createCard = (req, res) => {
  const { _id } = req.user;
  const { name, link } = req.body;
  Card.create({ name, link, owner: _id })
    .then((card) => res.status(200).send({ data: card }))
    .catch((err) => res.status(500).json({ message: `на сервере произошла ошибка ${err}` }));
};

const deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then((card) => {
      if (!card) {
        res.status(404).send({ message: 'нет карточки с таким id' });
      }
      res.status(200).send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({ message: 'некорректные данные' });
      } else {
        res.status(500).json({ message: `на сервере произошла ошибка ${err}` });
      }
    });
};

module.exports = { getCards, createCard, deleteCard };
