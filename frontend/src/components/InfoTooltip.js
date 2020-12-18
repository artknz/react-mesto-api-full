import React from 'react';
import OkImage from '../images/ok-response.png';
import ErrImage from '../images/err-response.png';

export default function InfoToolTip({ isOpen, onClose, statusResponse }) {
  return(
    <section className={`popup popup_profile ${isOpen && 'popup_opened'}`}>
      <div className="popup__container popup__container_type_message">
        <div className="popup__image-response">{statusResponse === true ? <img src={OkImage} alt="Успешно" /> : <img src={ErrImage} alt="Провал" />}</div>
        <h3 className="popup__text-response">{statusResponse === true ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте ещё раз.'}</h3>
        <button onClick={onClose} type="button" aria-label="Закрыть" className="popup__close popup__close_type_profile" />
      </div>
    </section>
  )
}
