import React from 'react';

export default function ImagePopup({ card, onClose }) {

  return (
    <section className={`popup popup_image ${card && 'popup_opened'}`}>
      <div className="popup__container popup__container_type_image">
        <button onClick={onClose} type="button" aria-label="Закрыть" className="popup__close popup__close_type_image" />
        <img src={card ? card.link : '#'} alt={card ? card.name : ''} className="popup__capture" />
        <h4 className="popup__titile popup__titile_type_image">{card ? card.name : ''}</h4>
      </div>
    </section>
  )
}
