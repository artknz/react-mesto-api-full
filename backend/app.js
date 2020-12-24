/* eslint-disable no-unused-vars */
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

const { PORT = 3000 } = process.env;

const allowedCors = [
  'http://artknz.students.nomoreparties.xyz',
  'https://artknz.students.nomoreparties.xyz',
  'http://localhost:3000',
];

app.use(cors({
  origin: allowedCors,
}));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(requestLogger);

app.use('/', require('./routes/index'));

app.use(errorLogger);

app.use(errors());

app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;

  res.status(err.statusCode).send({ message: statusCode === 500 ? 'На сервере произошла ошибка' : message });
});

app.listen(PORT, () => console.log(`server is running on port ${PORT}`));
