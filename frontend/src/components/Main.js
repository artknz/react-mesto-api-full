import React from 'react';
import Card from './Card';
import {CurrentUserContext} from '../contexts/CurrentUserContext';

export default function Main({ onAddPlace, onCardClick, cards, onCardLike, onCardDelete}) {
  const currentUser = React.useContext(CurrentUserContext)

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__avatar">
          <img src={currentUser.avatar} alt="#" className="profile__avatar-img" name="avatar" />
        </div>
        <div className="profile__info">
          <h1 className="profile__name">{currentUser.name}</h1>
          <p className="profile__status">{currentUser.about}</p>
        </div>
        <button onClick={onAddPlace} type="button" aria-label="Добавить" className="profile__add-button" />
      </section>
      <section className="elements">{cards.map(card => <Card key={card._id} card={card} onCardClick={onCardClick} onCardLike={onCardLike} onCardDelete={onCardDelete} />)}</section>
    </main>
  )
}
