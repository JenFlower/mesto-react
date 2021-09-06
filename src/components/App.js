import '../index.css';
import { useState, useEffect } from 'react'
import { api } from '../utils/Api'
import { CurrentUserContext } from '../contexts/CurrentUserContext'

import Header from './Header'
import Main from './Main'
import Footer from './Footer'
import ImagePopup from './ImagePopup'
import EditProfilePopup from './EditProfilePopup'
import EditAvatarPopup from './EditAvatarPopup'
import AddPlacePopup from './AddPlacePopup';


function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false)
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false)
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false)
  const [selectedCard, setSelectedCard] = useState(null)
  const [currentUser, setCurrentUser] = useState({})
  const [cards, setCards] = useState([])
  
  useEffect(() => {
    Promise.all([api.getUserData(), api.getCards()])
    .then(([ userData, cards ]) => { 
      setCards(cards)
      setCurrentUser(userData)
    })
    .catch(error => console.log(error));
  }, [])

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    
    // Отправляем запрос в API и получаем обновлённые данные карточки
    api.changeLikeCardStatus(card._id, isLiked).then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
    })
    .catch(error => console.log(error))
  }  

  function handleCardDelete(card) {
    api.deleteCard(card._id)
      .then(() => {
        setCards(cards.filter(item => item !== card));
    })
    .catch(error => console.log(error))
  }  

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

  const handleUpdateUser = (data) => {
    api.patchUserData(data)
      .then(res => {
        setCurrentUser(res)
        closeAllPopups()
      })
    .catch(error => console.log(error))
  }

  const handleUpdateAvatar = (data) => {
    api.updateAvatar(data)
      .then(res => {
        setCurrentUser(res)
        closeAllPopups()
      })
    .catch(error => console.log(error))
  }

  const handleAddPlace = (data) => {
    api.postCard(data)
      .then(newCard => {
        setCards([newCard, ...cards]); 
        closeAllPopups()
      })
      .catch(error => console.log(error))
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header />
        <Main 
          cards={cards}
          card={selectedCard}
          onOpenPreview={handleCardClick}
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete}
          />
        <Footer />
        <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser}/>
       
        <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlace} buttonText="Сохранить"/>

        <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar}/>
        <ImagePopup name="preview" card={selectedCard} onClose={closeAllPopups}/>
        

      </div>

    </CurrentUserContext.Provider>
      
  );
}

export default App;
