import React, { useEffect, useState } from 'react';
import { Route, Switch, Redirect, useHistory } from 'react-router-dom';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import AddPlacePopup from './AddPlacePopup';
import InfoToolTip from './InfoTooltip';
import Register from './Register';
import Login from './Login';
import ProtectedRoute from './ProtectedRoute';
import {api} from '../utils/api.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import * as auth from '../utils/Auth';

const App = () => {
  const[isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const[isInfoToolTipOpen, setInfoToolTipOpen] = useState(false);

  const[selectedCard, setSelectedCard] = useState(null);
  const[currentUser, setCurrentUser] = useState(CurrentUserContext);
  const[cards, setCards] = useState([]);

  const[ loggedIn, setLoggedIn ] = useState(false);
  const[ userData, setUserData ] = useState({
    email: ''
  });
  const[ statusResponse, setStatusResponse ] = useState()
  const history = useHistory();

  useEffect(_ => {
    tokenCheck()
  }, [])

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleCardDelete(card) {
    console.log(card)
    api.deleteCard(card._id)
    .then(() => {
      const newCards = cards.filter((c) => c._id !== card._id)
      setCards(newCards);
    })
    .catch((err) => console.log(err))
  }

  function handleAddPlaceSubmit(newCard) {
    api.addNewCard(newCard)
      .then((newCard) => {
      setCards([newCard.data, ...cards]);
      closeAllPopups()
    })
    .catch((err) => console.log(err))
  }

  function closeAllPopups() {
    setIsAddPlacePopupOpen(false);
    setInfoToolTipOpen(false);
    setSelectedCard(null);
  }

  useEffect(() => {
    if (loggedIn) {
      const jwt = localStorage.getItem('jwt')
      api.getUserInfo()
        .then(data => {
          setCurrentUser(data)
        })
        .catch((err) => console.log(err))

      api.getInitialCards().then(
        (item) => {
          setCards(item);
        })
        .catch((err) => console.log(err))

      auth.getContent(jwt).then((res) => {
        setUserData({
          email: res.email,
        });
      })
      .catch(err => console.log(err))
    }
  }, [loggedIn]);

  const handleLogin = (email, password) => {
    auth.authorize(email, password)
    .then(data => {
      localStorage.setItem('jwt', data.token)
      setLoggedIn(true);
      history.push('/');
    })
    .catch((err) => console.log(err))
  }

  const handleRegister = (email, password) => {
    auth.register(email, password)
    .then(data => {
      setUserData({
        email: data.email,
        password: data.password
      });
      history.push('/signin');
    })
    .then(res => {
      setStatusResponse(true)
      setInfoToolTipOpen(true);
    })
    .catch(err => {
      console.log(err)
      setStatusResponse(false)
      setInfoToolTipOpen(true);
    })
  }

  const tokenCheck = () => {
    const jwt = localStorage.getItem('jwt')
    if (jwt) {
      auth.getContent(jwt).then((res) => {
        if (res.email) {
          setLoggedIn(true);
          history.push('/');
        }
      })
      .catch(err => console.log(err))
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('jwt')
    setUserData({
      email: ''
    });
    setLoggedIn(false)
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
      <Header
        userData={userData}
        handleLogout={handleLogout}
      />
      <Switch>
        <ProtectedRoute
          exact
          path="/"
          loggedIn={loggedIn}
          component={Main}
          onAddPlace={handleAddPlaceClick}
          onCardClick={setSelectedCard}
          cards={cards}
          onCardDelete={handleCardDelete}
        />
        <Route path="/signup">
          <div className="registerContainer">
            <Register handleRegister={handleRegister} />
          </div>
        </Route>
        <Route path="/signin">
          <div className="loginContainer">
            <Login handleLogin={handleLogin} tokenCheck={tokenCheck} />
          </div>
        </Route>
        <Route path="/" exact>
          {loggedIn ? <Redirect to="/" /> : <Redirect to="/signin" />}
        </Route>
      </Switch>
      <Route path="/" exact>
        <Footer />
      </Route>

      <AddPlacePopup
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        onAddPlace={handleAddPlaceSubmit}
      />

      <ImagePopup
        card={selectedCard}
        onClose={closeAllPopups}
      />

      <InfoToolTip
        isOpen={isInfoToolTipOpen}
        onClose={closeAllPopups}
        statusResponse={statusResponse}
      />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
