import '../index.css';
import { useState, useEffect } from 'react'
import { api } from '../utils/Api'
import { CurrentUserContext } from '../contexts/CurrentUserContext'

import Header from './Header'
import Main from './Main'
import Footer from './Footer'
import PopupWithForm from './PopupWithForm'
import ImagePopup from './ImagePopup'


function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false)
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false)
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false)
  const [selectedCard, setSelectedCard] = useState(null)
  const [currentUser, setCurrentUser] = useState({})

  useEffect(() => {
    api.getUserData().then(res => {
      setCurrentUser(res)
    })
    .catch(error => console.log(error))
  }, [])

  console.log('currentUser', currentUser)

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true)
  }

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true)
  }

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true)
  }

  const handleCardClick = (data) => {
    setSelectedCard(data)
  }

  const closeAllPopups = () => {
    setIsAddPlacePopupOpen(false)
    setIsEditProfilePopupOpen(false)
    setIsEditAvatarPopupOpen(false)
    setSelectedCard(null)
  }

  console.log(selectedCard)
  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header />
        <Main 
          // cards={cards}
          card={selectedCard}
          onOpenPreview={handleCardClick}
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          />
        <Footer />
        <PopupWithForm name="profile" title="Редактировать профиль" isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} buttonText="Сохранить">
            <input className="popup__input popup__input_field_name" id="popup-name" type="text" name="inputName" placeholder="Имя" minLength="2" maxLength="40" autoComplete="off" required />
            <span className="popup__input-error" id="popup-name-error"></span>
            <input className="popup__input popup__input_field_job popup__input_last-child" id="popup-job" type="text" name="inputJob" placeholder="О себе" minLength="2" maxLength="200" autoComplete="off" required />
            <span className="popup__input-error" id="popup-job-error"></span>
        </PopupWithForm>

        <PopupWithForm name="card" title="Новое место" isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} buttonText="Сохранить">
            <input className="popup__input popup__input_field_card-name" id="popup-card-name" type="text" name="inputCardName" placeholder="Название"  minLength="2" maxLength="30" autoComplete="off" required />
            <span className="popup__input-error" id="popup-card-name-error"></span>
            <input className="popup__input popup__input_field_card-link popup__input_last-child" id="popup-card-link" type="url" name="inputCardLink" placeholder="Ссылка на картинку" autoComplete="off" required />
            <span className="popup__input-error" id="popup-card-link-error"></span>
        </PopupWithForm>
        
        <PopupWithForm name="delete" title="Вы уверены?" buttonText="Да"/>

        <PopupWithForm name="logo" title="Обновить аватар" isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} buttonText="Сохранить">
            <input className="popup__input popup__input_field_logo-link" id="popup-logo-link" type="url" name="inputAvatar" placeholder="Ссылка на картинку" autoComplete="off" required />
            <span className="popup__input-error" id="popup-logo-link-error"></span>
        </PopupWithForm>

        <ImagePopup name="preview" card={selectedCard} onClose={closeAllPopups}/>
        

      </div>

    </CurrentUserContext.Provider>
      
  );
}

export default App;
