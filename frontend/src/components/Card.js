import React from 'react';
import {CurrentUserContext} from '../contexts/CurrentUserContext';

export default function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = React.useContext(CurrentUserContext)
  const isOwn = card.owner === currentUser._id;

  const cardDeleteButtonClassName = (`element__delete ${isOwn && 'element__delete_true'}`);

  const handleCardClick = () => {
    onCardClick(card);
  }

  const handleDeleteClick = () => {
    onCardDelete(card);
  }

  return(
    <div className="element">
      <img onClick={handleCardClick} src={card.link} alt={card.name} className="element__image" />
      <button type="button" onClick={handleDeleteClick} className={cardDeleteButtonClassName} />
      <div className="element__title">
        <h3 className="element__text">{card.name}</h3>
        <div className="element__likes">
        </div>
      </div>
    </div>
  )
}
