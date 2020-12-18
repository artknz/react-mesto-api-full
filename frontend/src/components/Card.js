import React from 'react';
import {CurrentUserContext} from '../contexts/CurrentUserContext';

export default function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = React.useContext(CurrentUserContext)
  const isOwn = card.owner._id === currentUser._id;
  const isLiked = card.likes.some(i => i._id === currentUser._id);

  const cardDeleteButtonClassName = (`element__delete ${isOwn && 'element__delete_true'}`);
  const likedButtonClassName = (`element__like ${isLiked && 'element_liked'}`);

  const handleCardClick = () => {
    onCardClick(card);
  }

  const handleLikeClick = () => {
    onCardLike(card);
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
          <button type="button" onClick={handleLikeClick} className={likedButtonClassName} />
          <div className="element__like-count">{card.likes.length}</div>
        </div>
      </div>
    </div>
  )
}
