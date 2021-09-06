import PopupWithForm from './PopupWithForm'
import { useState } from 'react'
import React from 'react'

export default function AddPlacePopup(props) {
    const [name, setName] = useState('')
    const [link, setLink] = useState('')

    React.useEffect(() => {
        setName('')
        setLink('')
    }, [props.isOpen])

    const handleChangeName = (evt) => {
        setName(evt.target.value)
    }

    const handleChangeLink = (evt) => {
        setLink(evt.target.value)
    }

    function handleSubmit(e) {
        // Запрещаем браузеру переходить по адресу формы
        e.preventDefault();

        // Передаём значения управляемых компонентов во внешний обработчик
        props.onAddPlace({
            name,
            link
        });
    }

    return (
        <PopupWithForm name="card" title="Новое место" isOpen={props.isOpen} onClose={props.onClose} buttonText="Сохранить" onSubmit={handleSubmit}>
            <input className="popup__input popup__input_field_card-name" onChange={handleChangeName} value={name} id="popup-card-name" type="text" name="inputCardName" placeholder="Название"  minLength="2" maxLength="30" autoComplete="off" required />
            <span className="popup__input-error" id="popup-card-name-error"></span>
            <input className="popup__input popup__input_field_card-link popup__input_last-child" onChange={handleChangeLink} value={link} id="popup-card-link" type="url" name="inputCardLink" placeholder="Ссылка на картинку" autoComplete="off" required />
            <span className="popup__input-error" id="popup-card-link-error"></span>
        </PopupWithForm>
    )
}