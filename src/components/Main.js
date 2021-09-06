import React, { useState, useEffect } from 'react'
import { CurrentUserContext } from '../contexts/CurrentUserContext'
import {api} from '../utils/Api'
import Card from './Card'

export default function Main(props) {

  const currentUser = React.useContext(CurrentUserContext)

  return (
    <main cards={props.cards}>
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
          {props.cards.map(card => 
            (
              
              <Card key={card._id} card={card} onClick={props.onOpenPreview} onCardLike={props.onCardLike} onCardDelete={props.onCardDelete}/>
            )
          )}
        </ul>
      </section>
    </main>
  )
}