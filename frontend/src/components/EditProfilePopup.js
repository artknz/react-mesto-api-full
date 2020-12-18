import React from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

export default function EditProfilePopup({isOpen, onClose, onUpdateUser}) {
  const[name, setName] = React.useState('');
  const[description, setDescription] = React.useState('');

  const currentUser = React.useContext(CurrentUserContext);

  React.useEffect(() => {
    setName(currentUser.name || '');
    setDescription(currentUser.about || '');
  }, [currentUser, onClose]);

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleDescriptionChange(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm
    name='profile'
    title='Редактировать профиль'
    buttonText='Сохранить'
    isOpen={isOpen}
    onClose={onClose}
    onSubmit={handleSubmit}
  >
    <input id="name-input" type="text" value={name} onChange={handleNameChange} placeholder="Имя" name="name" minLength="2" maxLength="40" className="popup__field popup__field_type_name" required />
    <span id="name-input-error" className="popup__field-error" />

    <input id="status-input" type="text" value={description} onChange={handleDescriptionChange} placeholder="Статус" name="about" minLength="2" maxLength="200" className="popup__field popup__field_type_status" required />
    <span id="status-input-error" className="popup__field-error" />
  </PopupWithForm>
  )
}
