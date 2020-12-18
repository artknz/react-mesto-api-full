const express = require('express');

const app = express();
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

const PORT = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use((req, res, next) => {
  req.user = {
    _id: '5fb4021c90cc231579171e61',
  };

  next();
});

const userRoutes = require('./routes/users');
const cardsRoutes = require('./routes/cards');
const errorRoutes = require('./routes/error');

app.use('/', userRoutes);
app.use('/', cardsRoutes);
app.use('/', errorRoutes);

app.listen(PORT, () => console.log(`server is running on port ${PORT}`));
