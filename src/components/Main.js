import { useState, useEffect } from 'react'
import {api} from '../utils/Api'
import Card from './Card'

export default function Main(props) {

  const [userName, setUserName] = useState('')
  const [userDescription, setUserDescription] = useState('')
  const [userAvatar, setUserAvatar] = useState('')
  const [cards, setCards] = useState([])

  useEffect(() => {
    api.getUserData().then(res => {
      setUserName(res.name)
      setUserDescription(res.about)
      setUserAvatar(res.avatar)
    })
    .catch(error => console.log(error))
  }, [])

  useEffect(() => {
    api.getCards().then(res => {
      console.log(res)
      setCards(res)
    })
    .catch(error => console.log(error))
  }, [])


  return (
    <main>
      <section className="profile">
        <div className="profile__content">
          <div className="profile__cover-logo">
            <img className="profile__logo" src={userAvatar} alt="Аватар путешественника" onClick={props.onEditAvatar}/>
          </div>

          <div className="profile__info">
            <h1 className="profile__title">{userName}</h1>
            <button className="profile__edit-button" type="button" onClick={props.onEditProfile}></button>
            <p className="profile__subtitle">{userDescription}</p>
          </div>
        </div>
        <button className="profile__add-button" type="button" onClick={props.onAddPlace}></button>
      </section>

      <section className="elements">
        <ul className="elements__list">
          {cards.map(card => 
            (
              <Card key={card._id} card={card} onClick={props.onOpenPreview}/>
            )
          )}
        </ul>
      </section>
    </main>
  )
}