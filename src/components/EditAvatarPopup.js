import PopupWithForm from './PopupWithForm'
import React from 'react'

export default function EditProfilePopup(props) {
    const avatarRef = React.useRef('')

    function handleSubmit(e) {
        // Запрещаем браузеру переходить по адресу формы
        e.preventDefault();

        // Передаём значения управляемых компонентов во внешний обработчик
        props.onUpdateAvatar(avatarRef.current.value);
    }

    return (
        <PopupWithForm name="logo" title="Обновить аватар" isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit} buttonText="Сохранить">
            <input className="popup__input popup__input_field_logo-link" ref={avatarRef} id="popup-logo-link" type="url" name="inputAvatar" placeholder="Ссылка на картинку" autoComplete="off" required />
            <span className="popup__input-error" id="popup-logo-link-error"></span>
        </PopupWithForm>
    )
}