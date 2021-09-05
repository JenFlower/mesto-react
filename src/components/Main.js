import React, { useState, useEffect } from 'react'
import { CurrentUserContext } from '../contexts/CurrentUserContext'
import {api} from '../utils/Api'
import Card from './Card'

export default function Main(props) {

  const [cards, setCards] = useState([])
  const currentUser = React.useContext(CurrentUserContext)

  useEffect(() => {
    api.getCards().then(res => {
      console.log(res)
      setCards(res)
    })
    .catch(error => console.log(error))
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

  return (
    <main>
      <section className="profile">
        <div className="profile__content">
          <div className="profile__cover-logo">
            <img className="profile__logo" src={currentUser.avatar} alt="Аватар путешественника" onClick={props.onEditAvatar}/>
          </div>

          <div className="profile__info">
            <h1 className="profile__title">{currentUser.name}</h1>
            <button className="profile__edit-button" type="button" onClick={props.onEditProfile}></button>
            <p className="profile__subtitle">{currentUser.about}</p>
          </div>
        </div>
        <button className="profile__add-button" type="button" onClick={props.onAddPlace}></button>
      </section>

      <section className="elements">
        <ul className="elements__list">
          {cards.map(card => 
            (
              <Card key={card._id} card={card} onClick={props.onOpenPreview} onCardLike={handleCardLike} onCardDelete={handleCardDelete}/>
            )
          )}
        </ul>
      </section>
    </main>
  )
}