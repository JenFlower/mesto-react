import PopupWithForm from './PopupWithForm'
import { useState } from 'react'
import React from 'react'
import { CurrentUserContext } from '../contexts/CurrentUserContext'

export default function EditProfilePopup(props) {
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const currentUser = React.useContext(CurrentUserContext);

    React.useEffect(() => {
        if(currentUser.name !== undefined && currentUser.about !== undefined) {
            setName(currentUser.name);
            setDescription(currentUser.about);
        }
      }, [props.isOpen, currentUser]); 

    const handleChangeName = (evt) => {
        setName(evt.target.value)
    }

    const handleChangeDescription = (evt) => {
        setDescription(evt.target.value)
    }

    function handleSubmit(e) {
        // Запрещаем браузеру переходить по адресу формы
        e.preventDefault();

        // Передаём значения управляемых компонентов во внешний обработчик
        props.onUpdateUser({
            name,
            about: description,
        });
    }

    return (
        <PopupWithForm name="profile" title="Редактировать профиль" isOpen={props.isOpen} onClose={props.onClose} buttonText="Сохранить" onSubmit={handleSubmit}>
            <input className="popup__input popup__input_field_name" onChange={handleChangeName} value={name} id="popup-name" type="text" name="inputName" placeholder="Имя" minLength="2" maxLength="40" autoComplete="off" required />
            <span className="popup__input-error" id="popup-name-error"></span>
            <input className="popup__input popup__input_field_job popup__input_last-child" onChange={handleChangeDescription} value={description} id="popup-job" type="text" name="inputJob" placeholder="О себе" minLength="2" maxLength="200" autoComplete="off" required />
            <span className="popup__input-error" id="popup-job-error"></span>
        </PopupWithForm>
    )
}