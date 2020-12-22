import React from 'react';
import Card from './Card';
import {CurrentUserContext} from '../contexts/CurrentUserContext';

export default function Main({ onEditProfile, onAddPlace, onEditAvatar, onCardClick, cards, onCardLike, onCardDelete}) {
  const currentUser = React.useContext(CurrentUserContext)

  return (
    <main className="content">
      <section className="profile">
        <button onClick={onEditAvatar} className="profile__avatar">
          <img src={currentUser.avatar} alt="#" className="profile__avatar-img" name="avatar" />
        </button>
        <div className="profile__info">
          <h1 className="profile__name">{currentUser.name}</h1>
          <button onClick={onEditProfile} type="button" aria-label="Редактировать" className="profile__edit-button" />
          <p className="profile__status">{currentUser.about}</p>
        </div>
        <button onClick={onAddPlace} type="button" aria-label="Добавить" className="profile__add-button" />
      </section>
      <section className="elements">{cards.map(card => <Card key={card._id} card={card} onCardClick={onCardClick} onCardLike={onCardLike} onCardDelete={onCardDelete} />)}</section>
    </main>
  )
}
