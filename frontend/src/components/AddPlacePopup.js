import React from 'react';
import PopupWithForm from './PopupWithForm';

export default function AddPlacePopup({isOpen, onClose, onAddPlace}) {
  const [link, setLink] = React.useState('');
  const [name, setName] = React.useState('');

  function handleLinkChange(e) {
    setLink(e.target.value)
  }

  function handleNameChange(e) {
    setName(e.target.value)
  }

  function handleSubmit(e) {
    e.preventDefault();

    onAddPlace({
      name,
      link
    })
  }

  return (
    <PopupWithForm
        name='addcard'
        title='Новое место'
        buttonText='Создать'
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={handleSubmit}
      >
        <input id="title-input" type="text" value={name} onChange={handleNameChange} placeholder="Название" name="name" minLength="1" maxLength="30" className="popup__field popup__field_type_title" required />
        <span id="title-input-error" className="popup__field-error" />

        <input id="link-input" type="url" value={link} onChange={handleLinkChange} placeholder="Ссылка на картинку" name="link" className="popup__field popup__field_type_link" required />
        <span id="link-input-error" className="popup__field-error" />
      </PopupWithForm>
  )
}
